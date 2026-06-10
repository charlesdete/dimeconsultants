# Dime Consultants - VPS Deployment Setup (Non-Cloudflare)

## Overview

This document outlines the complete setup for deploying the Dime Consultants application on a VPS using Docker, without Cloudflare Workers dependencies.

## What Has Been Changed

### 1. Removed Cloudflare Dependencies
- Removed `@cloudflare/vite-plugin` from dependencies
- Removed `@lovable.dev/vite-tanstack-config` from devDependencies
- App now uses standard Node.js/Express build instead of Cloudflare Workers

### 2. Updated Configuration Files
- **vite.config.ts**: Simplified to use standard Vite plugins (React, TanStack Router, Tailwind, tsconfig-paths)
- **package.json**: Updated build scripts to include build-setup.js for Express server generation
- **.dockerignore**: Updated to optimize Docker image size
- **.env.example**: Created comprehensive environment variable template

### 3. Created Entry Point Files
- **src/entry.tsx**: React entry point that initializes the router
- **index.html**: HTML template for Vite build

### 4. Updated Docker Setup
- **Dockerfile**: Multi-stage Node.js build (already optimized)
- **docker-compose.prod.yml**: Production deployment configuration (already optimized)

## Architecture

```
┌─────────────────────────────┐
│   Nginx Reverse Proxy       │
│  (Domain: dimeconsultants.africa) │
│   Port 80/443               │
└──────────────┬──────────────┘
               │
               ▼ (port 3030)
┌─────────────────────────────┐
│   Docker Container          │
│   (Node.js/Express Server)  │
│   Port 3030                 │
└──────────────┬──────────────┘
               │
        ┌──────┴──────────┐
        │                 │
        ▼                 ▼
   React Client    API Routes
   (SPA Bundle)    (Email handler)
```

## Deployment Steps

### Prerequisites
- VPS with Ubuntu 20.04+ or similar
- Docker & Docker Compose installed
- Domain: `dimeconsultants.africa`
- SMTP credentials for email

### Step 1: Prepare VPS

```bash
# SSH into VPS
ssh user@your-vps-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker (if not already installed)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 2: Clone Repository

```bash
cd /opt
sudo git clone https://github.com/charlesdete/dimeconsultants.git
cd dimeconsultants
sudo chown -R $USER:$USER .
```

### Step 3: Configure Environment

```bash
# Create .env file from example
cp .env.example .env

# Edit with your SMTP credentials
nano .env
```

**Example .env:**
```env
NODE_ENV=production
PORT=3030

# Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=hello@dimeconsultants.co.ke
```

> **Important**: For Gmail, use [App Passwords](https://support.google.com/accounts/answer/185833), not your regular password.

### Step 4: Build and Deploy with Docker

```bash
# Build the Docker image
docker-compose -f docker-compose.prod.yml build

# Start the application
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Step 5: Configure Nginx

Create `/etc/nginx/sites-available/dimeconsultants`:

```nginx
# HTTP -> HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name dimeconsultants.africa www.dimeconsultants.africa;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name dimeconsultants.africa www.dimeconsultants.africa;

    # SSL Certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/dimeconsultants.africa/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dimeconsultants.africa/privkey.pem;

    # Security Headers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Proxy to Node.js app
    location / {
        proxy_pass http://localhost:3030;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/dimeconsultants /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: Set Up SSL (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot certonly --nginx -d dimeconsultants.africa -d www.dimeconsultants.africa

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Step 7: Firewall Configuration

```bash
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

## Verification

```bash
# Check Docker container status
docker-compose -f docker-compose.prod.yml ps

# Test application
curl http://localhost:3030

# View logs
docker-compose -f docker-compose.prod.yml logs --tail 100

# Test Nginx
sudo nginx -t
sudo systemctl status nginx
```

## Maintenance

### View Logs
```bash
docker-compose -f docker-compose.prod.yml logs -f app
```

### Restart Application
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Update Application
```bash
cd /opt/dimeconsultants
git pull origin main
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

### Stop Application
```bash
docker-compose -f docker-compose.prod.yml down
```

## Troubleshooting

### Container won't start
```bash
docker-compose -f docker-compose.prod.yml logs app
# Check for missing environment variables or port conflicts
```

### Port 3030 in use
```bash
sudo lsof -i :3030
sudo kill -9 <PID>
```

### Nginx not proxying correctly
```bash
sudo nginx -t
sudo systemctl restart nginx
tail /var/log/nginx/error.log
```

### Email not sending
1. Verify SMTP credentials in `.env`
2. Check firewall allows port 587/465
3. Check application logs for specific errors
4. For Gmail: ensure App Password is used (not regular password)

### DNS not resolving
1. Ensure domain nameservers point to VPS IP
2. Wait 24-48 hours for DNS propagation
3. Test with: `nslookup dimeconsultants.africa`

## Performance Tips

### Enable asset caching in Nginx
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Set Docker resource limits
Edit `docker-compose.prod.yml`:
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

## Security Best Practices

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong passwords** for SSH and database access

3. **Monitor logs regularly**
   ```bash
   docker-compose -f docker-compose.prod.yml logs --tail 1000
   ```

4. **Backup configuration**
   - Keep `.env` backed up securely
   - Store SSH keys safely

5. **Use fail2ban** for SSH protection
   ```bash
   sudo apt install fail2ban -y
   ```

## File Structure

```
/opt/dimeconsultants/
├── src/
│   ├── routes/          # React pages
│   ├── components/      # React components
│   ├── lib/             # Utilities
│   ├── entry.tsx        # React entry point
│   └── router.jsx       # Router config
├── dist/                # Build output
│   ├── client/          # React bundle
│   └── server.mjs       # Express server
├── Dockerfile           # Docker build
├── docker-compose.prod.yml
├── .env                 # Environment variables
├── package.json
└── vite.config.ts
```

## Key Environment Variables

```env
NODE_ENV=production      # Never set to development in production
PORT=3030               # Must match Nginx proxy_pass port

# SMTP for contact form emails
SMTP_HOST              # Email provider SMTP server
SMTP_PORT              # Usually 587 (TLS) or 465 (SSL)
SMTP_USER              # Email account
SMTP_PASS              # Password or app-specific password
RECIPIENT_EMAIL        # Where to send contact form submissions
```

## Support & Issues

1. **Check logs first**
   - Docker logs: `docker-compose logs app`
   - Nginx logs: `/var/log/nginx/error.log`
   - System logs: `journalctl -xe`

2. **Common issues resolved in DEPLOYMENT.md**

3. **For help**: Review the DEPLOYMENT.md file for detailed troubleshooting

## Important Notes

- `.env` file is NOT tracked in git (see `.gitignore` and `.dockerignore`)
- Always test configuration changes locally first
- Keep regular backups of your `.env` file
- Monitor disk space (logs can grow large)
- Set up log rotation for Docker containers

## Next Steps

1. Deploy on VPS following steps above
2. Monitor application for 24-48 hours
3. Set up automated backups
4. Configure monitoring/alerting (optional)
5. Document any custom configurations
