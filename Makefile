up:
	docker-compose up -d
build:
	docker-compose up -d --build
down:
	docker-compose down
db-shell:
	docker-compose exec db psql -U user -d one_phrase_db