This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment (Cloudflare Pages)

This project is optimized for Cloudflare Pages using `@cloudflare/next-on-pages`.

### Build Settings
- **Build command:** `npx @cloudflare/next-on-pages@1`
- **Build output directory:** `.vercel/output/static`

### Required Environment Variables
For the Admin CMS to function in production, you must set these variables in the Cloudflare Dashboard:
- `GITHUB_TOKEN`: Your GitHub Personal Access Token
- `GITHUB_OWNER`: Your GitHub Username
- `GITHUB_REPO`: `Karamuck-Bank`
- `GITHUB_BRANCH`: `main`

### Deployment Workflow
1. Commit and push your changes to GitHub.
2. Cloudflare Pages will automatically trigger a build.
3. Once deployed, the Admin panel will allow you to update content, which then commits back to GitHub and triggers a fresh build.

