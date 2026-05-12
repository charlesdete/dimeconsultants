# Docker Quick Reference

## Install Docker & Docker Compose

**Windows (Docker Desktop):**

1. Download: https://www.docker.com/products/docker-desktop
2. Install and restart your computer
3. Verify: `docker --version` and `docker-compose --version`

**macOS:**

```bash
brew install docker docker-compose
# or use Docker Desktop: https://www.docker.com/products/docker-desktop
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo usermod -aG docker $USER
```

## Getting Started (3 Simple Steps)

### 1. Start Docker Environment

```bash
docker-compose up -d
```

### 2. Open in Browser

- **App**: http://localhost:8080
- **Email Testing (Mailhog)**: http://localhost:8025

### 3. Stop When Done

```bash
docker-compose down
```

## Common Commands

| Command                                 | Purpose                          |
| --------------------------------------- | -------------------------------- |
| `docker-compose up -d`                  | Start all services in background |
| `docker-compose down`                   | Stop all services                |
| `docker-compose logs -f app`            | View live logs                   |
| `docker-compose exec app npm run build` | Run build in container           |
| `docker-compose ps`                     | Show running containers          |
| `docker-compose restart`                | Restart services                 |
| `make docker-up`                        | Start (using Makefile)           |
| `make docker-down`                      | Stop (using Makefile)            |
| `make docker-logs`                      | View logs (using Makefile)       |

## Using Makefile (Easier)

If you have `make` installed:

```bash
make docker-up        # Start
make docker-down      # Stop
make docker-logs      # View logs
make docker-shell     # Open shell
make docker-lint      # Run linter
make docker-format    # Format code
make restart          # Restart
make rebuild          # Rebuild images
```

## What's Running?

When you run `docker-compose up`, two services start:

1. **app** (http://localhost:8080)
   - Node.js development server
   - Live reload enabled
   - Source code at /app

2. **mailhog** (http://localhost:8025)
   - Email testing service
   - Captures form submissions
   - No real emails sent

## Troubleshooting

**Port already in use?**

```bash
# Edit docker-compose.yml, change ports from 8080:8080 to 8081:8080
docker-compose up -d
```

**Want to see code changes live?**

```bash
# Just save the file - hot reload is automatic
# If not working: docker-compose restart
```

**Need to run npm commands?**

```bash
# In container
docker-compose exec app npm install package-name

# Or on host machine
npm install package-name
```

**Want a full rebuild?**

```bash
docker-compose down -v
docker-compose up --build -d
```

## File Reference

| File                    | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `Dockerfile`            | Main Docker build (development, builder, production) |
| `Dockerfile.production` | Optimized for Cloudflare Workers                     |
| `docker-compose.yml`    | Orchestrates app + Mailhog services                  |
| `.dockerignore`         | Excludes files from Docker build                     |
| `.env.docker`           | Docker-specific environment variables                |
| `Makefile`              | Shortcut commands for Docker operations              |
| `DOCKER_SETUP.md`       | Detailed Docker documentation                        |

## For Windows Users

If `make` commands don't work, just use `docker-compose` directly:

```bash
docker-compose up -d
docker-compose logs -f app
docker-compose down
```

## Production Deployment

### Option 1: Cloudflare Workers (Recommended)

```bash
npm run build
npx wrangler deploy
```

### Option 2: Docker Container

```bash
docker build -t dime-navigator:latest .
docker run -p 8080:8080 \
  -e SMTP_HOST=smtp.gmail.com \
  -e SMTP_PORT=587 \
  -e SMTP_USER=your-email@gmail.com \
  -e SMTP_PASS=your-app-password \
  dime-navigator:latest
```

## Need Help?

- Docker docs: https://docs.docker.com
- Docker Compose docs: https://docs.docker.com/compose
- Mailhog: https://github.com/mailhog/MailHog
- TanStack Start: https://tanstack.com/start
