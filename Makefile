# Makefile for convenient Docker commands

.PHONY: help docker-up docker-down docker-logs docker-build docker-shell docker-lint docker-format docker-clean restart rebuild

help:
	@echo "Dime AI Navigator - Docker Commands"
	@echo "===================================="
	@echo ""
	@echo "Development:"
	@echo "  make docker-up        - Start development environment"
	@echo "  make docker-down      - Stop development environment"
	@echo "  make docker-logs      - View application logs"
	@echo "  make docker-shell     - Open shell in app container"
	@echo "  make docker-clean     - Remove containers and volumes"
	@echo "  make restart          - Restart services"
	@echo "  make rebuild          - Rebuild images"
	@echo ""
	@echo "Code Quality:"
	@echo "  make docker-lint      - Run ESLint"
	@echo "  make docker-format    - Format code with Prettier"
	@echo ""
	@echo "Building:"
	@echo "  make docker-build     - Build production Docker image"
	@echo ""

docker-up:
	docker-compose up -d
	@echo "✓ Services started. App: http://localhost:8080, Mailhog: http://localhost:8025"

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f app

docker-build:
	docker build -t dime-navigator:latest .
	@echo "✓ Production image built: dime-navigator:latest"

docker-shell:
	docker-compose exec app sh

docker-lint:
	docker-compose exec app npm run lint

docker-format:
	docker-compose exec app npm run format

docker-clean:
	docker-compose down -v
	docker system prune -a --volumes -f
	@echo "✓ Docker containers and volumes cleaned"

restart: docker-down docker-up
	@echo "✓ Services restarted"

rebuild:
	docker-compose up --build -d
	@echo "✓ Images rebuilt and services started"
