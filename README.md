# Commercial Psychology Learning OS

GitHubで手動編集し、Cloudflare Pagesへ自動デプロイする静的HTML + Pages Functions + D1構成です。

## ファイル構成

- `index.html` — 画面・カリキュラム・日次ログ
- `functions/api/state.js` — iPhoneとPC間でログを同期するAPI
- `schema.sql` — Cloudflare D1の初期テーブル
- `README.md` — この手順

## 1. GitHubへアップロード

1. GitHubで新しいRepositoryを作成します。
2. Repository名の例：`commercial-psychology-os`
3. 公開したくない場合はPrivateを選択します。
4. `Add file` → `Upload files` を開きます。
5. このフォルダ内のファイルを、フォルダ構造を維持してアップロードします。
6. `Commit changes` を押します。

GitHub上で編集する場合：

1. `index.html` を開きます。
2. 鉛筆アイコン `Edit this file` を押します。
3. 編集後、`Commit changes` を押します。
4. Cloudflareが自動的に再デプロイします。

## 2. Cloudflare D1を作成

1. Cloudflare Dashboardを開きます。
2. `Storage & databases` → `D1 SQL database` を開きます。
3. `Create database` を押します。
4. 名前を `commercial-psychology-db` にします。
5. 作成後、D1のConsoleを開きます。
6. `schema.sql` の中身を貼り付け、実行します。

## 3. Cloudflare Pagesへ接続

1. Cloudflare Dashboard → `Workers & Pages`
2. `Create application`
3. `Pages`
4. `Import an existing Git repository`
5. GitHubを接続し、作成したRepositoryを選択
6. Build settings:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: 空欄
   - Build output directory: `/`
7. `Save and Deploy`

## 4. PagesとD1を接続

1. 作成したPages projectを開きます。
2. `Settings` → `Bindings`
3. `Add binding` → `D1 database`
4. Variable nameに必ず `DB`
5. Databaseに `commercial-psychology-db`
6. ProductionとPreviewの両方へ設定
7. 保存後、`Deployments`から最新デプロイを再実行

## 5. iPhoneとPCで使う

1. Cloudflareの `https://...pages.dev` URLをPCで開きます。
2. 同じURLをiPhone Safariで開きます。
3. チェックを入れると、約0.35秒後にD1へ自動保存されます。
4. 別端末でページを再読み込みすると同じログが表示されます。
5. iPhoneではSafari共有ボタン → `ホーム画面に追加` でアプリ風に使えます。

## 注意

この初期版はURLを知っている人がログを閲覧・編集できます。URLを第三者へ共有しないでください。
本格利用前にはCloudflare Accessまたはログイン認証を追加してください。

GitHub上でカリキュラムを編集する場所は、`index.html` 内の
`const curriculum = [` から始まる部分です。
