// src/lib/storage-github.ts
// Cloudflare Edge compatible implementation using GitHub REST API

const GH_API  = 'https://api.github.com';
const OWNER   = process.env.GITHUB_OWNER  ?? '';
const REPO    = process.env.GITHUB_REPO   ?? '';
const BRANCH  = process.env.GITHUB_BRANCH ?? 'main';
const TOKEN   = process.env.GITHUB_TOKEN  ?? '';

function ghUrl(filePath: string, ref = false) {
  const encoded = filePath.split('/').map(encodeURIComponent).join('/');
  const url = new URL(`${GH_API}/repos/${OWNER}/${REPO}/contents/${encoded}`);
  if (ref) url.searchParams.set('ref', BRANCH);
  return url.toString();
}

async function ghFetch(filePath: string, init?: RequestInit, ref = false) {
  return fetch(ghUrl(filePath, ref), {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });
}

async function ghSha(filePath: string): Promise<string | null> {
  const res = await ghFetch(filePath, undefined, true);
  if (!res.ok) return null;
  return (await res.json()).sha ?? null;
}

async function ghRead(filePath: string): Promise<any | null> {
  const res = await ghFetch(filePath, undefined, true);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.content && data.encoding === 'base64') {
     const decoded = atob(data.content);
     return JSON.parse(decoded);
  }
  return null;
}

async function ghWrite(filePath: string, content: string, message: string) {
  const sha = await ghSha(filePath);
  const body: Record<string, unknown> = { message, content, branch: BRANCH };
  if (sha) body.sha = sha;
  const res = await ghFetch(filePath, { method: 'PUT', body: JSON.stringify(body) });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub write failed (${filePath}): ${err}`);
  }
}

async function ghDelete(filePath: string, message: string) {
  const sha = await ghSha(filePath);
  if (!sha) return;
  const res = await ghFetch(filePath, {
    method: 'DELETE',
    body: JSON.stringify({ message, sha, branch: BRANCH }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`[GitHub Delete Error] Failed to delete ${filePath}:`, err);
  }
}

function utf8ToBase64(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function extractImageUrls(obj: any): string[] {
  let urls: string[] = [];
  if (!obj) return urls;
  if (typeof obj === 'string') {
    if (obj.startsWith('/images/')) urls.push(obj);
  } else if (Array.isArray(obj)) {
    for (const item of obj) {
      urls = urls.concat(extractImageUrls(item));
    }
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      urls = urls.concat(extractImageUrls(obj[key]));
    }
  }
  return urls;
}

async function processBase64Field(
  value: string, key: string, model: string, slug: string, index?: number
): Promise<string> {
  const matches = value.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
  if (!matches || matches.length < 3) return value;

  const ext = matches[1];
  const rawBase64 = matches[2];

  const dirMap: Record<string, string> = {
    news: 'images/news',
    photoGallery: 'images/gallery',
    about: 'images/about',
    homepage: 'images/hero',
    facilities: 'images/facilities',
    contact: 'images/contact',
  };
  const directory = dirMap[model] || 'images/uploads';
  const filename = `${slug || 'upload'}-${key}${index !== undefined ? `-${index}` : ''}-${Date.now()}.${ext}`;
  const ghPath = `public/${directory}/${filename}`;

  await ghWrite(ghPath, rawBase64, `upload image to ${directory}`);
  return `/${directory}/${filename}`;
}

export async function handleGithubAdminRequest(req: any) {
  if (!TOKEN) {
    return new Response(
      JSON.stringify({ error: 'GITHUB_TOKEN is not set.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const body = await req.json();
  const { type, model, slug, data, action } = body;

  if (!model || !action) {
    return new Response(JSON.stringify({ error: 'Missing model or action' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const filePath = type === 'collection' ? `src/content/${model}/${slug}.json` : `src/content/${model}.json`;

  if (action === 'delete') {
    const oldData = await ghRead(filePath);
    if (oldData) {
       const oldImages = extractImageUrls(oldData);
       for (const imgUrl of oldImages) {
          await ghDelete(`public${imgUrl}`, `Prune orphaned media from ${model} ${slug}`);
       }
    }
    await ghDelete(filePath, `Delete ${model} ${slug}`);
    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  }

  const processedData = { ...data };

  for (const [key, value] of Object.entries(processedData)) {
    if (typeof value === 'string' && value.startsWith('data:image')) {
      processedData[key] = await processBase64Field(value, key, model, slug);
    } else if (Array.isArray(value)) {
      const arr: any[] = [];
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'string' && value[i].startsWith('data:image')) {
          arr.push(await processBase64Field(value[i], key, model, slug, i));
        } else {
          arr.push(value[i]);
        }
      }
      processedData[key] = arr;
    }
  }

  const oldData = await ghRead(filePath);
  if (oldData) {
     const oldImages = extractImageUrls(oldData);
     const newImages = extractImageUrls(processedData);
     
     const orphanedImages = oldImages.filter(img => !newImages.includes(img));
     for (const imgUrl of orphanedImages) {
        await ghDelete(`public${imgUrl}`, `Prune orphaned media after update to ${model} ${slug || 'singleton'}`);
     }
  }

  const content = utf8ToBase64(JSON.stringify(processedData, null, 2));
  await ghWrite(filePath, content, `Update ${model} ${slug || 'index'}`);

  return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
}
