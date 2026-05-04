import { NextRequest } from 'next/server';

export const runtime = 'edge';
// Uses Node runtime in dev for local fs, GitHub API in production (Cloudflare)
export async function POST(req: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      const { handleLocalAdminRequest } = await import('@/lib/storage-local');
      return await handleLocalAdminRequest(req);
    } else {
      const { handleGithubAdminRequest } = await import('@/lib/storage-github');
      return await handleGithubAdminRequest(req);
    }
  } catch (err: any) {
    console.error('Admin API Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
