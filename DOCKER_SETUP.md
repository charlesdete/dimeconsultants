# Docker Setup Guide

This project is containerized with Docker for development and production deployment.

## Prerequisites

- [Docker](https://docs.docker.com/install/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v1.29+)

## Quick Start - Local Development with Docker

### 1. Start the Development Environment

```bash
docker-compose up -d
```

This command will:

- Build the Docker image
- Start the Node.js development server on http://localhost:8080
- Start Mailhog email testing service on http://localhost:8025 (web UI)

### 2. View Application Logs

```bash
docker-compose logs -f app
```

### 3. Stop the Services

```bash
docker-compose down
```

### 4. Test Email Functionality

When submitting the contact form:

1. Fill out the form on http://localhost:8080/contact
2. Click "Send message"
3. View the captured email in Mailhog UI: http://localhost:8025

## Docker Commands

### Development

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f app

# Run commands in container
docker-compose exec app npm run lint
docker-compose exec app npm run format

# Rebuild after code changes
docker-compose up --build
```

### Building Docker Images

```bash
# Build development image
docker build --target development -t dime-navigator:dev .

# Build production image
docker build --target production -t dime-navigator:prod .

# Run development container
docker run -p 8080:8080 -v $(pwd):/app dime-navigator:dev

# Run production container
docker run -p 8080:8080 dime-navigator:prod
```

## Environment Variables

### For Docker Development (automatic)

The `docker-compose.yml` automatically configures:

- `SMTP_HOST=mailhog` - Points to Mailhog service
- `SMTP_PORT=1025` - Mailhog SMTP port
- Other email settings for testing

### For Production

When deploying to production, set these environment variables:

- `SMTP_HOST` - Your email provider's SMTP server
- `SMTP_PORT` - SMTP port (usually 587)
- `SMTP_USER` - Your email address
- `SMTP_PASS` - Your email password or API key
- `RECIPIENT_EMAIL` - Where form submissions go

## Dockerfile Details

The Dockerfile uses a multi-stage build:

1. **Builder Stage**: Compiles the application
2. **Development Stage**: Runs `npm run dev` with live reload
3. **Production Stage**: Minimal image with built artifacts

## Networking

Services communicate via the `dime-network` bridge network:

- `app` - Main application
- `mailhog` - Email testing service

## Volumes

- `.:/app` - Source code hot reload
- `/app/node_modules` - Node modules (persisted)

## Troubleshooting

### Port Already in Use

```bash
# Change port in docker-compose.yml
# ports:
#   - "8081:8080"  # Use 8081 instead of 8080

docker-compose up
```

### Clear Docker Cache

```bash
docker-compose down --volumes
docker system prune -a
docker-compose up --build
```

### View Container Status

```bash
docker-compose ps
```

### Run Shell in Container

```bash
docker-compose exec app sh
```

## Production Deployment

### Build Production Image

```bash
docker build -t dime-navigator:latest .
```

### Deploy with Docker

```bash
docker run \
  -p 8080:8080 \
  -e SMTP_HOST=smtp.gmail.com \
  -e SMTP_PORT=587 \
  -e SMTP_USER=your-email@gmail.com \
  -e SMTP_PASS=your-app-password \
  -e RECIPIENT_EMAIL=hello@dimeconsultants.co.ke \
  dime-navigator:latest
```

### Deploy to Cloudflare Workers (Recommended)

```bash
# Build the app
npm run build

# Deploy to Cloudflare
wrangler deploy
```

## Notes

- Hot module reload (HMR) works in Docker thanks to volume mounts
- Mailhog captures all emails sent during development (no real emails sent)
- Production builds are optimized for minimal image size
- Node.js 24 Alpine base image for security and small footprint
