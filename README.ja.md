# CSV 2 Markdown Table

[English](./README.md) | 日本語

CSVデータをMarkdownテーブル形式に変換するWebアプリケーションです。

## 機能

- CSVデータのMarkdownテーブルへの変換
- 列の選択機能
- テキストの配置調整（左寄せ、中央寄せ、右寄せ）
- テーブルのプレビュー表示
- 変換結果のクリップボードへのコピー

## URL

https://csv-2-markdown-table.yend.dev/

## 技術スタック

- React
- TypeScript
- Tailwind CSS
- Vite

## 開発

Node.js 24 を使用します。Cloudflare Pages もルートの `.node-version` に従います。

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
```

`.npmrc` で依存パッケージのインストールスクリプトを無効化し、Node.js の要件を厳守します。新しい依存の追加時はバージョンを固定し、`npm ci` で lockfile を再現します。`npm run` で明示したスクリプトは実行できます。

SEO のメタ情報は `packages/app/index.html`、OGP 画像・robots.txt・サイトマップは `packages/app/public/` に配置しています。

## ライセンス

MIT License - 詳細は[LICENSE](./LICENSE)ファイルを参照してください。