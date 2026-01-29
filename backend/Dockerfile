# Goの公式イメージを使用（軽量なalpine版）
FROM golang:1.25-alpine

# ビルドツールやSQLiteに必要なライブラリをインストール
RUN apk add --no-cache gcc musl-dev

# コンテナ内の作業ディレクトリを設定
WORKDIR /app

# 依存関係（go.mod, go.sum）を先にコピーしてキャッシュを利用
COPY go.mod go.sum ./
RUN go mod download

# ソースコードをコピー
COPY . .

# GraphQLサーバーのデフォルトポート
EXPOSE 8080

# サーバーを起動（cmd/server.go がgqlgen initで生成されたエントリポイント）
CMD ["go", "run", "cmd/server.go"]