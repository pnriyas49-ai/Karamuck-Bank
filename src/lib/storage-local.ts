// src/lib/storage-local.ts
// Local Node.js filesystem implementation for development

import fs from 'fs';
import path from 'path';

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
  const relativePath = `/${directory}/${filename}`;
  
  const absolutePath = path.join(process.cwd(), 'public', directory, filename);
  
  const dirPath = path.dirname(absolutePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(absolutePath, Buffer.from(rawBase64, 'base64'));
  
  return relativePath;
}

export async function handleLocalAdminRequest(req: any) {
  const body = await req.json();
  const { type, model, slug, data, action } = body;

  if (!model || !action) {
    return new Response(JSON.stringify({ error: 'Missing model or action' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const filePath = type === 'collection' 
    ? path.join(process.cwd(), `src/content/${model}/${slug}.json`) 
    : path.join(process.cwd(), `src/content/${model}.json`);

  if (action === 'delete') {
    if (fs.existsSync(filePath)) {
      const oldData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const oldImages = extractImageUrls(oldData);
      
      for (const imgUrl of oldImages) {
        const absoluteImgPath = path.join(process.cwd(), 'public', imgUrl);
        if (fs.existsSync(absoluteImgPath)) {
           fs.unlinkSync(absoluteImgPath);
        }
      }
      fs.unlinkSync(filePath);
    }
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

  // Prune orphaned media
  if (fs.existsSync(filePath)) {
     const oldData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
     const oldImages = extractImageUrls(oldData);
     const newImages = extractImageUrls(processedData);
     
     const orphanedImages = oldImages.filter(img => !newImages.includes(img));
     for (const imgUrl of orphanedImages) {
        const absoluteImgPath = path.join(process.cwd(), 'public', imgUrl);
        if (fs.existsSync(absoluteImgPath)) {
           fs.unlinkSync(absoluteImgPath);
        }
     }
  }

  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(processedData, null, 2));

  return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
}
