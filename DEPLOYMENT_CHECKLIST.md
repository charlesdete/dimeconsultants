# Dime Consultants - Deployment Checklist for dimeconsultants.africa

## Pre-Deployment ✅

### Local Development
- [ ] Clone repository: `git clone https://github.com/charlesdete/dimeconsultants.git`
- [ ] Install dependencies: `npm install`
- [ ] Read MIGRATION_SUMMARY.md to understand changes
- [ ] Review all deployment guides in order:
  1. VPS_DEPLOYMENT_SETUP.md (main guide)
  2. DOCKER_REFERENCE.md (Docker-specific)
  3. DEPLOYMENT.md (troubleshooting)

### Environment Preparation
- [ ] Verify VPS credentials and IP address
- [ ] Test SSH access to VPS
- [ ] Confirm domain nameservers point to VPS IP (or will be updated)
- [ ] Gather SMTP credentials:
  - [ ] SMTP Host (e.g., smtp.gmail.com)
  - [ ] SMTP Port (typically 587 or 465)
  - [ ] SMTP Username
  - [ ] SMTP Password (or app-specific password for Gmail)
  - [ ] Recipient email (where to send contact form submissions)

### Domain Setup
- [ ] Registered domain: dimeconsultants.africa
- [ ] Domain nameservers point to VPS IP or update in progress
- [ ] DNS propagation time expected: 24-48 hours (can proceed with VPS IP during setup)

## VPS Setup ✅

### Step 1: System Configuration
- [ ] SSH into VPS: `ssh user@your-vps-ip`
- [ ] Update system: `sudo apt update && sudo apt upgrade -y`
- [ ] Set timezone: `sudo timedatectl set-timezone UTC`
- [ ] Configure hostname: `sudo hostnamectl set-hostname dimeconsultants`

### Step 2: Install Docker
- [ ] Install Docker: `curl -fsSL https://get.docker.com | sudo sh`
- [ ] Add current user to docker group: `sudo usermod -aG docker $USER && newgrp docker`
- [ ] Verify Docker: `docker --version`
- [ ] Install Docker Compose: `sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose`
- [ ] Verify Docker Compose: `docker-compose --version`

### Step 3: Install Nginx
- [ ] Install Nginx: `sudo apt install nginx -y`
- [ ] Verify Nginx: `sudo nginx -v`
- [ ] Check Nginx status: `sudo systemctl status nginx`

### Step 4: Install Certbot (SSL)
- [ ] Install Certbot: `sudo apt install certbot python3-certbot-nginx -y`
- [ ] Verify Certbot: `certbot --version`

### Step 5: Configure Firewall
- [ ] Enable UFW: `sudo ufw enable`
- [ ] Allow SSH: `sudo ufw allow 22/tcp`
- [ ] Allow HTTP: `sudo ufw allow 80/tcp`
- [ ] Allow HTTPS: `sudo ufw allow 443/tcp`
- [ ] Verify rules: `sudo ufw status`

## Application Deployment ✅

### Step 1: Clone Repository
- [ ] Create directory: `sudo mkdir -p /opt && cd /opt`
- [ ] Clone repo: `sudo git clone https://github.com/charlesdete/dimeconsultants.git`
- [ ] Change ownership: `sudo chown -R $USER:$USER dimeconsultants`
- [ ] Navigate: `cd dimeconsultants`

### Step 2: Configure Environment
- [ ] Copy env template: `cp .env.example .env`
- [ ] Edit .env: `nano .env` (or your preferred editor)
- [ ] Set all required variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3030`
  - [ ] `SMTP_HOST=` (your SMTP server)
  - [ ] `SMTP_PORT=` (usually 587)
  - [ ] `SMTP_USER=` (your email)
  - [ ] `SMTP_PASS=` (your password/app password)
  - [ ] `RECIPIENT_EMAIL=hello@dimeconsultants.co.ke`
- [ ] Save and exit (Ctrl+X, Y, Enter if using nano)
- [ ] Verify no .env in git: `git status | grep .env` (should show none)

### Step 3: Build Docker Image
- [ ] Build image: `docker-compose -f docker-compose.prod.yml build`
- [ ] Verify build succeeded (look for "Successfully built" or similar)
- [ ] Check image: `docker images | grep dime`

### Step 4: Start Application
- [ ] Start container: `docker-compose -f docker-compose.prod.yml up -d`
- [ ] Check status: `docker-compose -f docker-compose.prod.yml ps` (should show "Up")
- [ ] View logs: `docker-compose -f docker-compose.prod.yml logs --tail 50`
- [ ] Test app: `curl http://localhost:3030` (should return HTML)

## Nginx Configuration ✅

### Step 1: Create Nginx Config
- [ ] Edit Nginx config: `sudo nano /etc/nginx/sites-available/dimeconsultants`
- [ ] Paste configuration from VPS_DEPLOYMENT_SETUP.md
- [ ] Update domain name in config (currently shows dimeconsultants.africa)
- [ ] Save and exit

### Step 2: Enable Site
- [ ] Enable site: `sudo ln -s /etc/nginx/sites-available/dimeconsultants /etc/nginx/sites-enabled/`
- [ ] Test syntax: `sudo nginx -t` (should show "successful")
- [ ] Reload Nginx: `sudo systemctl reload nginx`

### Step 3: Verify Nginx
- [ ] Check Nginx status: `sudo systemctl status nginx` (should be "active")
- [ ] Test HTTP redirect: 
  - Windows/Mac: Open browser to `http://your-vps-ip`
  - Should see Nginx default page (SSL required for proper serving)

## SSL/HTTPS Setup ✅

### Step 1: Get SSL Certificate
- [ ] Request certificate: `sudo certbot certonly --nginx -d dimeconsultants.africa -d www.dimeconsultants.africa`
- [ ] Follow prompts (email, agree to terms)
- [ ] Verify success: Certificate issued and saved
- [ ] Check certificate: `ls /etc/letsencrypt/live/dimeconsultants.africa/`

### Step 2: Update Nginx with SSL Paths
- [ ] Edit Nginx config: `sudo nano /etc/nginx/sites-available/dimeconsultants`
- [ ] Verify SSL certificate paths exist:
  - [ ] `/etc/letsencrypt/live/dimeconsultants.africa/fullchain.pem`
  - [ ] `/etc/letsencrypt/live/dimeconsultants.africa/privkey.pem`
- [ ] Test syntax: `sudo nginx -t`
- [ ] Reload: `sudo systemctl reload nginx`

### Step 3: Auto-Renewal
- [ ] Enable Certbot timer: `sudo systemctl enable certbot.timer`
- [ ] Start timer: `sudo systemctl start certbot.timer`
- [ ] Test renewal (dry run): `sudo certbot renew --dry-run`
- [ ] Verify: "The following Certificates will be renewed"

### Step 4: Verify HTTPS Works
- [ ] Wait for DNS propagation (if using domain)
- [ ] Test HTTPS: `curl https://dimeconsultants.africa` (or use VPS IP if DNS not ready)
- [ ] Should return HTML without SSL errors
- [ ] (Once DNS resolves) Open browser to https://dimeconsultants.africa

## Testing ✅

### Basic Functionality
- [ ] Homepage loads: Open https://dimeconsultants.africa/
- [ ] All pages accessible:
  - [ ] Home
  - [ ] About
  - [ ] Services
  - [ ] Programme
  - [ ] Insights
  - [ ] Success Stories
  - [ ] Contact
  - [ ] Use Cases
- [ ] CSS/styling loads correctly
- [ ] Images load correctly
- [ ] Responsive on mobile (use browser dev tools)

### Contact Form
- [ ] Navigate to Contact page
- [ ] Fill out form:
  - [ ] Name
  - [ ] Email
  - [ ] Organisation (optional)
  - [ ] Message
- [ ] Submit form
- [ ] Should show success message
- [ ] Check email inbox for submission (may take a few seconds)
- [ ] If email doesn't arrive:
  - [ ] Check spam/junk folder
  - [ ] Verify SMTP credentials in .env
  - [ ] Check container logs: `docker-compose -f docker-compose.prod.yml logs app | grep -i email`

### SPA Navigation
- [ ] Click links between pages (should not reload)
- [ ] Use browser back button (should work)
- [ ] Direct URL navigation (e.g., `/about`) should work
- [ ] Refresh page should stay on correct page

### Performance
- [ ] Pages load quickly (< 3 seconds)
- [ ] No console errors (open browser dev tools F12)
- [ ] No network errors (check Network tab in dev tools)
- [ ] Mobile performance acceptable (use mobile view in dev tools)

### Security
- [ ] HTTPS lock icon shows in browser
- [ ] No mixed content warnings
- [ ] SSL certificate shows as valid
- [ ] No security warnings in browser

## Post-Deployment ✅

### Monitoring Setup
- [ ] Check container health: `docker-compose -f docker-compose.prod.yml ps`
- [ ] Monitor logs: `docker-compose -f docker-compose.prod.yml logs -f --tail 100`
- [ ] Set up log rotation (already configured in docker-compose.prod.yml)

### Backup Configuration
- [ ] Backup .env file: `cp /opt/dimeconsultants/.env /opt/dimeconsultants/.env.backup`
- [ ] Store backup in safe location (not public)
- [ ] Note backup location in your records

### Documentation
- [ ] Save VPS IP address and SSH credentials in secure location
- [ ] Save domain registrar login credentials
- [ ] Document any custom configuration made
- [ ] Save SMTP credentials securely (these are in .env)

### Scheduled Tasks
- [ ] SSL auto-renewal: Configured (Certbot timer)
- [ ] System updates: Consider setting up: `sudo apt install unattended-upgrades`
- [ ] Monitoring: Consider setting up log monitoring (optional)

### Communication
- [ ] Update domain registrar nameservers (if applicable)
- [ ] Announce deployment to team
- [ ] Share access information securely with team

## Maintenance Checklist ✅

### Daily
- [ ] Monitor application logs (if issues arise)
- [ ] Monitor disk space: `df -h`
- [ ] Monitor container status: `docker ps`

### Weekly
- [ ] Check SSL certificate renewal status: `sudo certbot certificates`
- [ ] Review Nginx error logs: `sudo tail /var/log/nginx/error.log`
- [ ] Review application error logs: `docker-compose -f docker-compose.prod.yml logs --tail 1000`

### Monthly
- [ ] Update system packages: `sudo apt update && sudo apt upgrade`
- [ ] Update Docker images: `docker-compose pull`
- [ ] Backup configuration files
- [ ] Review disk usage and clean if needed: `docker system prune -a`

### Quarterly
- [ ] Update application (git pull + rebuild)
- [ ] Review and update .env configuration as needed
- [ ] Test disaster recovery (restore from backup if available)
- [ ] Review security updates for Node.js and dependencies

## Troubleshooting Quick Reference

### Application not accessible
- [ ] Check Docker container: `docker-compose -f docker-compose.prod.yml ps`
- [ ] Check logs: `docker-compose -f docker-compose.prod.yml logs app`
- [ ] Check port 3030: `sudo lsof -i :3030`
- [ ] Check Nginx: `sudo systemctl status nginx`

### SSL/HTTPS Issues
- [ ] Check certificate: `sudo certbot certificates`
- [ ] Check Nginx config: `sudo nginx -t`
- [ ] Restart Nginx: `sudo systemctl restart nginx`
- [ ] Check certificate files exist: `ls /etc/letsencrypt/live/dimeconsultants.africa/`

### Email not sending
- [ ] Check SMTP credentials in .env
- [ ] Check container logs: `docker-compose -f docker-compose.prod.yml logs app`
- [ ] Test SMTP connectivity: `nc -v smtp.gmail.com 587`
- [ ] Verify recipient email is correct

### Disk space issues
- [ ] Check usage: `df -h`
- [ ] Clean Docker: `docker system prune -a --volumes`
- [ ] Check log sizes: `du -sh /var/lib/docker/containers/*/`

### Performance issues
- [ ] Check container resources: `docker stats dime-consultants-app`
- [ ] Check system resources: `top`, `free -h`, `iostat`
- [ ] Check application logs for errors
- [ ] Consider increasing memory in docker-compose.prod.yml

## Final Sign-Off

- [ ] All tests passed
- [ ] Application accessible via HTTPS
- [ ] SSL certificate valid
- [ ] Contact form working
- [ ] Monitoring configured
- [ ] Backup location documented
- [ ] Team notified
- [ ] Documentation updated
- [ ] Ready for production use

---

## Important Notes

1. **DNS Propagation**: May take 24-48 hours. During this time, use VPS IP for testing.
2. **SSL Certificate**: Valid for 90 days, auto-renewal happens via Certbot timer.
3. **Email**: Only works with correct SMTP credentials. Test locally first.
4. **.env File**: NEVER commit to git. Keep backed up securely.
5. **Support**: Refer to VPS_DEPLOYMENT_SETUP.md, DOCKER_REFERENCE.md, or DEPLOYMENT.md for detailed help.

---

**Deployment Date**: ________________
**Deployed By**: ________________
**VPS Provider**: ________________
**VPS IP**: ________________
