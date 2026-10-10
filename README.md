# CSV 2 Markdown Table

English | [日本語](./README.ja.md)

A web application that converts CSV data into Markdown table format.

## Features

- Convert CSV data to Markdown table format
- Column selection
- Text alignment options (left, center, right)
- Table preview
- Copy conversion results to clipboard

## URL

https://csv-2-markdown-table.yend.dev/

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite

## Development

Use Node.js 24. Cloudflare Pages also reads the root `.node-version`.

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
```

The project `.npmrc` disables dependency lifecycle scripts, enforces Node.js requirements, and saves exact versions for newly added dependencies. Use `npm ci` for reproducible installs. Explicit `npm run` commands still work.

SEO metadata lives in `packages/app/index.html`. The social image, robots.txt, and sitemap live in `packages/app/public/`.

## License

MIT License - See [LICENSE](./LICENSE) file for details.