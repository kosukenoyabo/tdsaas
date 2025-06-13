# Retail Forecast Dashboard

需要予測と最適在庫の分析結果を表示するReactダッシュボードアプリケーションです。

## 機能

- サイドバーナビゲーション
- 検索・フィルタリング機能
- 需要予測データの表形式表示
- レスポンシブデザイン
- モダンなUI/UX

## 技術スタック

- React 18
- TypeScript
- Tailwind CSS
- React Scripts

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm start
```

3. ブラウザで `http://localhost:3000` を開く

## ビルド

本番用ビルドを作成:
```bash
npm run build
```

## プロジェクト構造

```
src/
├── components/
│   ├── Sidebar.tsx      # サイドバーナビゲーション
│   ├── Header.tsx       # ヘッダー・トップバー
│   ├── FilterBar.tsx    # 検索・フィルター
│   └── ForecastTable.tsx # 予測データテーブル
├── App.tsx              # メインアプリケーション
├── index.tsx            # エントリーポイント
└── index.css            # スタイル
``` 