# Claude Code Spec

## 概要

このアプリケーションは、ユーザーが入力したURLをQRコードに変換し、任意のアイコンをQRコード中央に埋め込むReactアプリです。バリデーション機能により、URL以外が入力された際には警告メッセージを表示します。

## 機能要件

- URL入力フィールドを提供する
- 入力された値がURLかどうかをリアルタイムでバリデーションする
- 有効なURLが入力されていればQRコードを生成する
- QRコード中央に任意のアイコンを埋め込む
- アイコンは `public/icons/` フォルダ内の画像から選択可能（初期状態は空）
- フォルダに画像が存在しない場合は「None」選択のみ表示

## UI要素

- テキスト入力フィールド（URL入力）
- QRコード表示エリア
- アイコン選択ドロップダウンまたはグリッド
- バリデーションエラーメッセージ（赤文字）

## 技術スタック

- React（+ TypeScript）
- Vite（Reactプロジェクトの初期化に使用）
- ライブラリ（必要に応じてインストールを提案）
  - `qrcode.react` または `react-qr-code`
  - `clsx`（任意）
  - `react-icons`（任意）

## ディレクトリ構成（想定）

```plaintext
src/
├── components/
│   ├── QRGenerator.tsx         # 入力・生成・QR表示をまとめたコンポーネント
│   ├── IconSelector.tsx        # アイコン画像を一覧から選択
│   ├── QRPreview.tsx           # QRコード描画用
│   └── ValidationMessage.tsx   # バリデーションメッセージ表示
├── hooks/
│   └── useIconList.ts          # public/icons/ の画像一覧を取得するカスタムフック
├── utils/
│   └── isValidUrl.ts           # URLバリデーション関数
├── types/
│   └── index.ts                # 型定義（例：IconData など）
├── App.tsx
└── main.tsx

public/
├── index.html
└── icons/                     # ユーザーがアイコン画像を配置するフォルダ（初期は空でOK）
