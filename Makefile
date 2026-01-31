up:
	docker-compose up -d
build:
	docker-compose up -d --build
down:
	docker-compose down
db-shell:
	docker-compose exec db psql -U user -d one_phrase_db
schema-generate:
	docker exec one-phrase-log-backend-1 go run github.com/99designs/gqlgen generate
mod-tidy:
	docker exec one-phrase-log-backend-1 go mod tidy
test:
	docker exec one-phrase-log-backend-1 go test -v ./graph/...