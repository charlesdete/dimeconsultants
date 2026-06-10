# Complete Docker VPS Deployment Guide for dimeconsultants.africa

This guide provides a complete setup for deploying the Dime Consultants app on a VPS with Docker, Nginx reverse proxy, and SSL certificates.

## Prerequisites

- VPS with Ubuntu 20.04+ or similar Linux distribution
- Domain `dimeconsultants.africa` pointing to your VPS IP
- SSH access to the VPS
- Docker and Docker Compose installed on the VPS
- 2GB+ RAM and 20GB disk space

## Step 1: Install Docker and Docker Compose on VPS

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

## Step 2: Clone and Configure the Application

```bash
# Create app directory
mkdir -p /opt/dimeconsultants
cd /opt/dimeconsultants

# Clone the repository
git clone https://github.com/charlesdete/dimeconsultants.git .
git checkout fix-the-app

# Create .env file with production settings
cat > .env << 'EOF'
# Server configuration
NODE_ENV=production
PORT=3030

# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password for Gmail, not regular password
RECIPIENT_EMAIL=hello@dimeconsultants.co.ke

# Optional: Set a specific log level
LOG_LEVEL=info
EOF

# Update with your actual SMTP credentials
nano .env
```

### Getting Gmail SMTP App Password:

1. Enable 2FA on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer" (or any device)
4. Google will generate a 16-character app password
5. Use this in SMTP_PASS

## Step 3: Create Docker Compose Configuration

The app already includes a `docker-compose.prod.yml` file configured for port 3030. Verify it contains:

```yaml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: dime-consultants-app
    ports:
      - "3030:3030"
    environment:
      - NODE_ENV=production
      - PORT=3030
    env_file:
      - .env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3030', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 15s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    networks:
      - dime-network

networks:
  dime-network:
    driver: bridge
```

## Step 4: Install and Configure Nginx Reverse Proxy

```bash
# Install Nginx
apt install -y nginx certbot python3-certbot-nginx

# Create Nginx config for your domain
cat > /etc/nginx/sites-available/dimeconsultants.africa << 'EOF'
server {
    listen 80;
    server_name dimeconsultants.africa www.dimeconsultants.africa;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name dimeconsultants.africa www.dimeconsultants.africa;

    # SSL Certificates (Certbot will fill these in)
    ssl_certificate /etc/letsencrypt/live/dimeconsultants.africa/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dimeconsultants.africa/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;

    location / {
        limit_req zone=general burst=20;
        
        proxy_pass http://localhost:3030;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /api/send-email {
        limit_req zone=api burst=5;
        
        proxy_pass http://localhost:3030;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
    }

    location ~ ~$ {
        deny all;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/dimeconsultants.africa /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Start Nginx
systemctl start nginx
systemctl enable nginx
```

## Step 5: Setup SSL Certificate with Let's Encrypt

```bash
# Get SSL certificate
certbot certonly --nginx -d dimeconsultants.africa -d www.dimeconsultants.africa

# Set up automatic renewal
systemctl enable certbot.timer
systemctl start certbot.timer

# Test renewal
certbot renew --dry-run
```

## Step 6: Build and Start Docker Application

```bash
cd /opt/dimeconsultants

# Build the Docker image
docker-compose -f docker-compose.prod.yml build

# Start the application
docker-compose -f docker-compose.prod.yml up -d

# Verify it's running
docker-compose -f docker-compose.prod.yml ps

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Step 7: Create Systemd Service for Docker Compose

Create an auto-start service:

```bash
cat > /etc/systemd/system/dime-consultants.service << 'EOF'
[Unit]
Description=Dime Consultants Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/dimeconsultants
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable dime-consultants.service
systemctl start dime-consultants.service
```

## Step 8: Verify Deployment

```bash
# Check if the app is accessible
curl -I https://dimeconsultants.africa

# Check Docker containers
docker ps | grep dime

# Monitor logs in real-time
docker-compose -f docker-compose.prod.yml -f /opt/dimeconsultants logs -f --tail=50
```

## Maintenance and Troubleshooting

### View Application Logs

```bash
# Last 50 lines
docker-compose -f /opt/dimeconsultants/docker-compose.prod.yml logs --tail=50

# Follow logs in real-time
docker-compose -f /opt/dimeconsultants/docker-compose.prod.yml logs -f

# Container-specific logs
docker logs dime-consultants-app
```

### Restart Application

```bash
cd /opt/dimeconsultants
docker-compose -f docker-compose.prod.yml restart
```

### Update Environment Variables

```bash
cd /opt/dimeconsultants

# Edit .env file
nano .env

# Restart for changes to take effect
docker-compose -f docker-compose.prod.yml restart
```

### Monitor Health

```bash
# Check if container is healthy
docker inspect dime-consultants-app | grep -A 5 "Health"

# Check Nginx proxy status
systemctl status nginx

# Test endpoint health
curl https://dimeconsultants.africa/api/health 2>/dev/null || echo "No health endpoint"
```

### Backup Application Data

```bash
# Backup .env and configuration
tar -czf dimeconsultants-backup-$(date +%Y%m%d).tar.gz /opt/dimeconsultants/.env /opt/dimeconsultants/docker-compose.prod.yml
```

## Network Architecture

```
┌─────────────────┐
│  Client Browser │
│ (Internet HTTPS)│
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│   Nginx Reverse Proxy   │
│   Port 80/443           │
│ dimeconsultants.africa  │
└────────┬────────────────┘
         │ (HTTP 3030)
         ▼
┌─────────────────────────┐
│   Docker Container      │
│  Node.js Express Server │
│      Port 3030          │
│                         │
│  - Serves React SPA     │
│  - Email API (/api/*)   │
│  - Static assets        │
└─────────────────────────┘
```

## Security Checklist

- ✅ SSL/TLS certificate (Let's Encrypt)
- ✅ Nginx security headers (HSTS, CSP, etc.)
- ✅ Rate limiting on API endpoints
- ✅ Environment variables in .env (not in code)
- ✅ Docker container runs as non-root user
- ✅ Health checks enabled
- ✅ Logs rotated (json-file max-size: 10m)
- ✅ Firewall rules (UFW recommended)

### Enable UFW Firewall (Recommended)

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp     # SSH
ufw allow 80/tcp     # HTTP
ufw allow 443/tcp    # HTTPS
ufw enable
ufw status
```

## Performance Tuning

### Nginx Configuration Optimization

The provided Nginx config includes:
- Gzip compression (reduces bandwidth ~70%)
- Connection pooling
- Caching headers for static assets
- Rate limiting to prevent abuse

### Docker Resource Limits (Optional)

Edit `docker-compose.prod.yml` to add limits:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## Monitoring and Logging

### View Recent Errors

```bash
docker-compose -f /opt/dimeconsultants/docker-compose.prod.yml logs --tail=100 | grep -i error
```

### Monitor System Resources

```bash
# Real-time container stats
docker stats dime-consultants-app

# Disk usage
df -h /opt/dimeconsultants

# Memory usage
free -h
```

## Summary

Your Dime Consultants application is now deployed with:

- ✅ Docker containerization for easy deployment
- ✅ Nginx reverse proxy for performance & security
- ✅ HTTPS/SSL via Let's Encrypt
- ✅ Auto-renewal of SSL certificates
- ✅ Node.js Express server on port 3030
- ✅ Email functionality via SMTP
- ✅ Health checks & auto-restart
- ✅ Structured logging
- ✅ Security headers & rate limiting

The app is accessible at `https://dimeconsultants.africa` and automatically restarts on VPS reboot.
