package main

import (
	"log"
	"net/http"
	database "one-phrase-log/db"
	"one-phrase-log/graph"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"
)

const defaultPort = "8080"

func main() {

	database.InitDB()
	database.Migrate()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	// CORSの設定
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"}, // フロントエンドのローカルポートを許可
		AllowCredentials: true,
		AllowedMethods: []string{"GET","POST","OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
		Debug: true,
	})

	// 1. GraphQLのクエリ実行用エンドポイント
	http.Handle("/query", c.Handler(srv))

	// 2. 開発用のPlayground（ブラウザで操作する画面）
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))

	// 3. Health Check エンドポイント
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}