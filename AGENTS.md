# 開発ガイド

## 構成

- npm workspaces の構成。アプリ本体は `packages/app`。
- React・TypeScript・Vite・Tailwind CSS を使用。
- `src/pages/home` が変換画面、`src/features/csv-markdown-table-converter` が変換処理と UI、`src/shared` が共通処理。
- CSV の解析はブラウザ内で実行する。入力データを外部へ送信しない。

## 環境と依存関係

- Node.js のバージョンはルートの `.node-version` を参照。Cloudflare Pages もこのファイルを使用する。
- インストールにはルートで `npm ci` を使い、`package-lock.json` と一致する状態を再現する。
- `.npmrc` は依存パッケージのインストールスクリプトを無効化し、エンジン要件と TLS 検証を厳守する。新規追加時のバージョン固定と監査も有効。
- `ignore-scripts=true` でも、明示的な `npm run` コマンドは実行できる。
- 依存関係を変更した場合は lockfile も更新する。TypeScript・ESLint・各プラグインの peerDependencies を確認し、互換性を保つ。
- マージ前に競合を解消し、統合した依存関係で検証する。

## 検証

ルートで実行する。

```sh
npm ci
npm run lint
npm test
npm run build
```

- `npm test` は `tests/converter.test.mjs` の変換処理の回帰テストを実行する。
- 依存関係の更新時は `npm audit` も確認する。
- UI の変更時はデスクトップとモバイルで、入力・列選択・配置・コピー・クリア・エラー表示を確認する。
- 空欄、不正 CSV、未選択の列で古い変換結果を表示しない。CSV 内の引用符・改行・パイプの処理を維持する。

## UI・SEO・アセット

- UI は日本語。操作に必要なラベルを優先し、不要な番号・キャッチコピー・説明セクションを追加しない。
- ページの `<title>` は `CSV to Markdown Table`。OGP と Twitter カードのタイトルは `CSV to Markdown Table`。
- SEO のメタ情報と構造化データは `packages/app/index.html`。
- OGP 画像・robots.txt・サイトマップは `packages/app/public/`。
- OGP は通常のアプリ画面を Playwright の Chromium でスクリーンショットして生成する。独自の OGP 用レイアウトは作らない。初回は `npx playwright install chromium`、再生成は `npm run generate:og`。スクリプトがアプリをビルドし、ローカルで表示して撮影する。生成した `packages/app/public/og-image.png` をコミットする。通常のビルドはコミット済み画像を使用する。
- UI のスタイルは CSS Modules。共通スタイルは `src/shared/ui/converter.module.css`、グローバル CSS はリセットと基本設定だけにする。
- ヘッダーのロゴとファビコンは共通の `packages/app/public/favicon.svg` を使用する。
- 公開 URL は `https://csv-2-markdown-table.yend.dev/`。canonical、OGP、サイトマップの URL を一致させる。
- Cloudflare Pages のビルドコマンドは `npm run build`、公開ディレクトリは `packages/app/dist`。

## ドキュメント

README は概要・機能・開発コマンドを中心に簡潔に保つ。設定やファイル配置など、開発作業に必要な説明はこのファイルにまとめる。
