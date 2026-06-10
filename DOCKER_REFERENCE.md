# Docker Deployment Reference for Dime Consultants

## Quick Commands

### Build
```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml build --no-cache  # Force rebuild
```

### Run
```bash
docker-compose -f docker-compose.prod.yml up -d     # Start in background
docker-compose -f docker-compose.prod.yml up        # Start in foreground (see logs)
```

### Monitor
```bash
docker-compose -f docker-compose.prod.yml ps                    # Status
docker-compose -f docker-compose.prod.yml logs                  # All logs
docker-compose -f docker-compose.prod.yml logs -f               # Follow logs
docker-compose -f docker-compose.prod.yml logs --tail 100       # Last 100 lines
docker-compose -f docker-compose.prod.yml logs app              # Specific service
```

### Control
```bash
docker-compose -f docker-compose.prod.yml restart               # Restart all
docker-compose -f docker-compose.prod.yml restart app           # Restart one service
docker-compose -f docker-compose.prod.yml stop                  # Stop all
docker-compose -f docker-compose.prod.yml down                  # Stop and remove
docker-compose -f docker-compose.prod.yml down --volumes        # Stop and remove volumes
```

### Exec
```bash
docker-compose -f docker-compose.prod.yml exec app sh           # Shell into container
docker-compose -f docker-compose.prod.yml exec app node --version
docker ps                                                        # List all containers
docker logs <container-id>                                       # View container logs
```

## Docker File Structure

### Dockerfile Stages

```dockerfile
# Stage 1: Builder
FROM node:20-alpine
WORKDIR /app
COPY package*.json pnpm-lock.yaml* yarn.lock* ./
RUN npm install  # or pnpm/yarn
COPY .  .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app
COPY package*.json pnpm-lock.yaml* yarn.lock* ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3030
HEALTHCHECK ...
CMD ["node", "dist/server.mjs"]
```

### Benefits of Multi-Stage Build
- **Stage 1** (Builder): Contains all build dependencies (saves 50-60% image size)
- **Stage 2** (Runtime): Only has production dependencies (smaller, faster to deploy)
- Final image size: ~400-500MB

## docker-compose.prod.yml Configuration

```yaml
version: "3.8"

services:
  app:
    build:
      context: .                # Build from current directory
      dockerfile: Dockerfile    # Use Dockerfile
    container_name: dime-consultants-app
    ports:
      - "3030:3030"           # Host:Container port mapping
    environment:
      - NODE_ENV=production
      - PORT=3030
    env_file:
      - .env                  # Load from .env file
    restart: unless-stopped   # Auto-restart if crashes
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3030"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 15s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"      # Rotate logs > 10MB
        max-file: "3"        # Keep max 3 log files
    networks:
      - dime-network

networks:
  dime-network:
    driver: bridge
```

## Environment File (.env)

Located in project root, NOT in git (see `.gitignore`).

```env
# Required
NODE_ENV=production
PORT=3030

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=hello@dimeconsultants.co.ke
```

### Loading Order in docker-compose
1. `.env` file (if `env_file` specified)
2. `environment` section
3. Command-line overrides

### Example Override
```bash
docker-compose -f docker-compose.prod.yml run -e SMTP_HOST=smtp.sendgrid.net app node dist/server.mjs
```

## Health Checks

The container includes health check in docker-compose:

```bash
# Check status
docker-compose -f docker-compose.prod.yml ps
# Status will show: Up (healthy), Up (starting), or Unhealthy

# View health check logs
docker inspect dime-consultants-app | grep -A 20 Healthcheck
```

### Manual Health Check
```bash
curl http://localhost:3030
# Should return HTML page, not error
```

## Logging Strategy

### View Logs
```bash
# Real-time follow
docker-compose -f docker-compose.prod.yml logs -f app

# Last N lines
docker-compose -f docker-compose.prod.yml logs --tail 500

# Since specific time
docker-compose -f docker-compose.prod.yml logs --since 2024-06-10T10:00:00

# Timestamp format
docker-compose -f docker-compose.prod.yml logs -t
```

### Log Rotation (Already Configured)
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"    # Rotate when log file > 10MB
    max-file: "3"      # Keep 3 rotated files maximum
```

This prevents logs from consuming all disk space.

### Check Log File Sizes
```bash
docker inspect --format='{{.LogPath}}' dime-consultants-app
ls -lh /var/lib/docker/containers/<container-id>/
```

## Resource Management

### Memory & CPU Limits

Add to docker-compose.prod.yml:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### Monitor Resource Usage
```bash
docker stats dime-consultants-app
docker stats --no-stream dime-consultants-app  # One snapshot
```

### Common Resource Issues
- **High memory**: App leaking memory, increase limit
- **High CPU**: Many requests, may need load balancer
- **Disk full**: Check log rotation, clean old images

## Troubleshooting

### Container won't start
```bash
# Check logs for errors
docker-compose -f docker-compose.prod.yml logs app

# Common causes:
# - Port 3030 already in use
# - Missing environment variables
# - Build failure
```

### Port already in use
```bash
# Find process using port 3030
sudo lsof -i :3030
# Kill the process
sudo kill -9 <PID>

# Or change port in docker-compose.prod.yml
```

### Out of disk space
```bash
# Check disk usage
df -h

# Clean up old Docker images
docker image prune -a --force

# Clean up unused containers
docker container prune --force

# Remove all unused data
docker system prune -a --volumes
```

### Container keeps restarting
```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs app

# Common causes:
# - App crash (check logs for error)
# - Out of memory (increase limit)
# - SMTP credentials wrong
```

### Slow performance
```bash
# Check resource usage
docker stats dime-consultants-app

# Check logs for slow queries/errors
docker-compose -f docker-compose.prod.yml logs --tail 1000 app

# Increase memory limit in docker-compose.prod.yml
```

## Update Process

### Update & Redeploy
```bash
cd /opt/dimeconsultants

# Pull latest code
git pull origin main

# Rebuild image
docker-compose -f docker-compose.prod.yml build --no-cache

# Stop old container
docker-compose -f docker-compose.prod.yml down

# Start new container
docker-compose -f docker-compose.prod.yml up -d

# Verify
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs app
```

### Rollback to Previous Version
```bash
git checkout <previous-commit>
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

## Image Management

### List Images
```bash
docker images | grep dime
docker image inspect dime-consultants-app:latest
```

### Remove Images
```bash
# Remove specific image
docker rmi dime-consultants-app:latest

# Remove all untagged images
docker rmi $(docker images -q -f dangling=true)
```

### Image Size Optimization
```bash
# Check image layers
docker history dime-consultants-app:latest

# Tips for smaller images:
# - Use Alpine Linux (✓ already doing)
# - Multi-stage builds (✓ already doing)
# - Minimize installed packages
# - Clean package manager cache
```

## Network Configuration

### Docker Network Inspection
```bash
# List networks
docker network ls

# Inspect dime-network
docker network inspect dime-network

# Services on network can reach each other by container name
```

### Nginx Proxy Configuration
Nginx should be on the host, proxying to container:

```nginx
location / {
    proxy_pass http://localhost:3030;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Advanced Topics

### Custom Build Args
```bash
docker build --build-arg NODE_VERSION=20 .
```

### Specific Environment Override
```bash
docker-compose -f docker-compose.prod.yml \
  --env-file .env.production \
  up -d
```

### Multi-Environment Setup
```bash
# Production
docker-compose -f docker-compose.prod.yml up -d

# Staging (if needed)
docker-compose -f docker-compose.staging.yml up -d
```

### Container Communication
If adding more services in future:

```yaml
services:
  app:
    # ...
    networks:
      - dime-network
  
  cache:  # example: Redis
    networks:
      - dime-network
    
# app can reach cache at: redis://cache:6379
```

## Security Best Practices

1. **Don't use root user**
   - Dockerfile already runs as non-root user (nodejs)

2. **Scan images for vulnerabilities**
   ```bash
   docker scan dime-consultants-app:latest
   ```

3. **Use specific image versions**
   - ✓ Using `node:20-alpine` (specific version)

4. **Keep dependencies updated**
   ```bash
   npm audit fix
   docker build --no-cache .
   ```

5. **Use secrets properly**
   - ✓ Using `.env` file (not in git)
   - Not hardcoding in Dockerfile

## Performance Tuning

### Node.js Optimization
```bash
# Increase max connections per port
docker-compose -f docker-compose.prod.yml exec app sysctl net.core.somaxconn

# Max file descriptors
docker-compose -f docker-compose.prod.yml exec app ulimit -n
```

### Memory Optimization
```bash
# In docker-compose.prod.yml environment:
NODE_OPTIONS=--max-old-space-size=1024
```

### Bundle Analysis
```bash
# Check client bundle size
ls -lh dist/client/assets/
# Should be < 500KB gzipped
```

## Backup Strategy

### Backup Configuration
```bash
# Backup .env file
cp /opt/dimeconsultants/.env /opt/dimeconsultants/.env.backup

# Backup Docker images
docker save dime-consultants-app:latest | gzip > dime-app-backup.tar.gz
```

### Restore
```bash
docker load < dime-app-backup.tar.gz
docker-compose -f docker-compose.prod.yml up -d
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and push
        run: |
          docker-compose -f docker-compose.prod.yml build
          # Push to registry if needed
      - name: Deploy
        run: |
          ssh user@vps "cd /opt/dimeconsultants && \
          git pull && \
          docker-compose -f docker-compose.prod.yml down && \
          docker-compose -f docker-compose.prod.yml up -d"
```

## Useful Docker Commands Cheatsheet

```bash
# Information
docker ps                                      # List running containers
docker ps -a                                   # List all containers
docker images                                  # List images
docker info                                    # Docker system info
docker version                                 # Docker version

# Management
docker build -t dime:v1 .                     # Build image
docker run -d -p 3030:3030 dime:v1            # Run container
docker exec <id> <command>                    # Run command in container
docker logs <id>                              # View logs
docker stop <id>                              # Stop container
docker rm <id>                                # Remove container
docker rmi <image>                            # Remove image

# Compose
docker-compose build                          # Build
docker-compose up -d                          # Start
docker-compose down                           # Stop
docker-compose restart                        # Restart
docker-compose exec <service> <cmd>           # Exec command
docker-compose logs -f                        # Follow logs
```

---

For complete deployment instructions, see **VPS_DEPLOYMENT_SETUP.md**
