# Dime Consultants — Production Deployment Guide

Server directory: `~/web/dimeconsultants`

---

## Prerequisites (one-time server setup)

SSH into your server via Termius, then install Docker if not already present:

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version
docker compose version
```

Install Nginx (for the reverse proxy):
```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
```

---

## 1 — Clone the repository

```bash
mkdir -p ~/web
cd ~/web
git clone https://github.com/charlesdete/ai-navigator-frontend.git dimeconsultants
cd dimeconsultants
```

---

## 2 — Create your .env file

```bash
cp .env.example .env
nano .env
```

Fill in your real values:

```env
NODE_ENV=production
PORT=3030

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@dimeconsultants.africa
SMTP_PASS=your-real-password

# Comma-separated, no spaces
RECIPIENT_EMAIL=hello@dimeconsultants.co.ke,info@dimeconsultants.africa
```

Save and exit: `Ctrl+X → Y → Enter`

---

## 3 — Build and start the Docker container

```bash
cd ~/web/dimeconsultants

# Build the image from source
docker build -f Dockerfile.prod -t dime-consultants .

# Start the container
docker compose -f docker-compose.prod.yml up -d
```

To verify it's running:
```bash
docker ps
docker logs dime-ai-navigator
```

Test the app is responding on port 3030:
```bash
curl http://localhost:3030
```

---

## 4 — Configure Nginx reverse proxy

Copy the project's nginx config:
```bash
sudo cp ~/web/dimeconsultants/nginx.conf /etc/nginx/sites-available/dimeconsultants
sudo ln -s /etc/nginx/sites-available/dimeconsultants /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

The site is now accessible over HTTP at `http://dimeconsultants.africa`.

---

## 5 — Enable HTTPS with Let's Encrypt (SSL)

```bash
sudo certbot --nginx -d dimeconsultants.africa -d www.dimeconsultants.africa
```

Certbot will automatically:
- Obtain certificates
- Update your nginx config with the SSL paths
- Set up auto-renewal

Then uncomment the SSL lines in `nginx.conf` if needed and reload:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Updating the site (subsequent deployments)

```bash
cd ~/web/dimeconsultants

# Pull latest code
git pull

# Rebuild and restart (zero-downtime swap)
docker build -f Dockerfile.prod -t dime-consultants .
docker compose -f docker-compose.prod.yml up -d --force-recreate
```

---

## Useful commands

| Task | Command |
|---|---|
| View live logs | `docker logs -f dime-ai-navigator` |
| Stop the container | `docker compose -f docker-compose.prod.yml down` |
| Restart the container | `docker compose -f docker-compose.prod.yml restart` |
| Check container status | `docker ps` |
| Check Nginx status | `sudo systemctl status nginx` |
| Renew SSL cert manually | `sudo certbot renew` |
| Check SSL auto-renewal | `sudo certbot renew --dry-run` |

---

## Directory structure on the server

```
~/web/dimeconsultants/
├── .env                     ← your secrets (never commit this)
├── .env.example             ← template (safe to commit)
├── docker-compose.prod.yml  ← runs the container
├── Dockerfile.prod          ← builds the image
├── nginx.conf               ← reverse proxy config
└── DEPLOY.md                ← this file
```

---

## How the build works

```
npm run build
  └── vite build        → dist/client/   (HTML + JS + CSS assets)
  └── node build-setup.mjs → dist/server.mjs  (Express server)

docker run → node dist/server.mjs
  ├── serves dist/client/ as static files
  ├── POST /api/send-email  (contact form → nodemailer → SMTP)
  └── GET  *              (SPA fallback → index.html)
```
