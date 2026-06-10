# Dime Consultants - Documentation Index

Complete documentation for VPS deployment of Dime Consultants application on dimeconsultants.africa.

## Quick Start

**First time deploying?** Start here:
1. Read **MIGRATION_SUMMARY.md** (5 min) - Understand what changed
2. Read **VPS_DEPLOYMENT_SETUP.md** (20 min) - Complete deployment guide
3. Follow **DEPLOYMENT_CHECKLIST.md** - Step-by-step checklist
4. Refer to **DOCKER_REFERENCE.md** - Docker commands as needed

## Documentation Files

### 📋 MIGRATION_SUMMARY.md
**Purpose**: Understand the changes from Cloudflare Workers to VPS deployment
**Read time**: 5-10 minutes
**Contains**:
- What changed and why
- Before/after architecture comparison
- File changes summary
- Deployment comparison table
- Known issues and workarounds
- Testing checklist

**When to read**: Before deployment or to understand the project changes

### 🚀 VPS_DEPLOYMENT_SETUP.md (MAIN GUIDE)
**Purpose**: Complete step-by-step deployment instructions for dimeconsultants.africa
**Read time**: 30-40 minutes
**Contains**:
- System requirements and prerequisites
- VPS setup (Docker, Nginx, SSL)
- Repository cloning and configuration
- Docker build and deployment
- Nginx reverse proxy configuration
- SSL setup with Let's Encrypt
- Verification and testing
- Maintenance procedures
- Troubleshooting for common issues
- Security best practices
- Performance optimization tips

**When to read**: Before deploying to production VPS
**How to use**: Follow steps 1-7 sequentially

### ✅ DEPLOYMENT_CHECKLIST.md
**Purpose**: Interactive checklist to ensure nothing is missed during deployment
**Read time**: Reference during deployment
**Contains**:
- Pre-deployment verification
- VPS system setup checklist
- Docker installation checklist
- Application deployment checklist
- Nginx configuration checklist
- SSL/HTTPS setup checklist
- Testing checklist
- Post-deployment checklist
- Maintenance checklist
- Troubleshooting quick reference

**When to use**: During actual deployment (check off items as completed)

### 🐳 DOCKER_REFERENCE.md
**Purpose**: Docker-specific commands and best practices
**Read time**: Reference as needed
**Contains**:
- Quick Docker commands
- Docker build and run instructions
- docker-compose configuration explained
- Environment file configuration
- Health checks
- Logging strategy
- Resource management
- Troubleshooting Docker issues
- Update and rollback procedures
- Image management
- Network configuration
- Advanced Docker topics
- Security best practices
- Performance tuning
- Backup and restore procedures
- CI/CD integration examples
- Useful commands cheatsheet

**When to use**: When working with Docker or containers

### 📖 DEPLOYMENT.md
**Purpose**: General deployment info, troubleshooting, and maintenance
**Read time**: Reference as needed
**Contains**:
- Overview and prerequisites
- Installation steps on VPS
- Environment configuration
- Docker build and deployment options
- Nginx configuration
- Email configuration (detailed SMTP setup)
- Monitoring and maintenance commands
- Health check information
- Troubleshooting section
- Production best practices
- Quick reference commands

**When to use**: For general deployment questions or troubleshooting

### 📝 .env.example
**Purpose**: Template for environment variables
**Contains**:
- All required environment variables
- Helpful comments for each variable
- Example values

**How to use**:
```bash
cp .env.example .env
nano .env  # Edit with your credentials
```

**Important**: `.env` file is in `.gitignore` and not tracked in git

## File Structure After Setup

```
/opt/dimeconsultants/
├── Documentation/
│   ├── MIGRATION_SUMMARY.md          # Changes from Cloudflare
│   ├── VPS_DEPLOYMENT_SETUP.md       # Main deployment guide
│   ├── DEPLOYMENT_CHECKLIST.md       # Step-by-step checklist
│   ├── DOCKER_REFERENCE.md           # Docker commands
│   ├── DEPLOYMENT.md                 # General deployment info
│   ├── DOCUMENTATION_INDEX.md        # This file
│   └── .env.example                  # Environment template
│
├── Application Code/
│   ├── src/
│   ├── dist/                         # Built output
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── Dockerfile
│
├── Docker Configuration/
│   └── docker-compose.prod.yml       # Production docker-compose
│
├── Configuration/
│   └── .env                          # Your configuration (not in git)
│
└── Build Setup/
    └── build-setup.js                # Creates Express server
```

## Common Tasks

### I want to...

**Deploy to production VPS**
→ VPS_DEPLOYMENT_SETUP.md (steps 1-7)

**Verify deployment went smoothly**
→ DEPLOYMENT_CHECKLIST.md (Testing section)

**Restart the application**
→ DOCKER_REFERENCE.md (Quick Commands → Control)

**Check application logs**
→ DOCKER_REFERENCE.md (Quick Commands → Monitor)
→ Or: `docker-compose -f docker-compose.prod.yml logs -f`

**Update the application**
→ DOCKER_REFERENCE.md (Update Process)

**Fix a deployment problem**
→ DEPLOYMENT.md or DOCKER_REFERENCE.md (Troubleshooting)

**Configure email/SMTP**
→ .env.example (SMTP configuration section)
→ Or: VPS_DEPLOYMENT_SETUP.md (Email Configuration)

**Manage Docker containers**
→ DOCKER_REFERENCE.md (entire document)

**Understand what changed**
→ MIGRATION_SUMMARY.md

**Monitor system resources**
→ DOCKER_REFERENCE.md (Resource Management)

**Backup my configuration**
→ DOCKER_REFERENCE.md (Backup Strategy)

## Recommended Reading Order

### First-Time Deployer
1. MIGRATION_SUMMARY.md (understand changes)
2. VPS_DEPLOYMENT_SETUP.md (learn the process)
3. DEPLOYMENT_CHECKLIST.md (follow step-by-step)
4. Bookmark DOCKER_REFERENCE.md (for daily use)

### Experienced DevOps
1. MIGRATION_SUMMARY.md (2 min) - Quick overview
2. DEPLOYMENT_CHECKLIST.md - Verify nothing missed
3. Jump to relevant sections in other docs as needed

### Operations Team
1. DOCKER_REFERENCE.md (daily commands)
2. DEPLOYMENT_CHECKLIST.md (maintenance section)
3. Keep VPS_DEPLOYMENT_SETUP.md for reference
4. DEPLOYMENT.md (troubleshooting)

## Key Information at a Glance

**Application Stack**
- Frontend: React + TanStack Router
- Server: Node.js 20 + Express
- Build: Vite
- Deployment: Docker
- Reverse Proxy: Nginx
- SSL: Let's Encrypt (Certbot)

**Ports**
- HTTP (Nginx): 80
- HTTPS (Nginx): 443
- Application (Docker): 3030

**Domain**
- dimeconsultants.africa
- www.dimeconsultants.africa

**Required Credentials**
- SMTP credentials for contact form emails
- VPS SSH access
- Domain registrar access (if updating nameservers)

**Important Locations on VPS**
- Application: `/opt/dimeconsultants/`
- Nginx config: `/etc/nginx/sites-available/dimeconsultants`
- SSL certificates: `/etc/letsencrypt/live/dimeconsultants.africa/`
- Docker logs: `docker-compose -f docker-compose.prod.yml logs`

## Support & Help

**Question about**: → Check:
- Deployment process → VPS_DEPLOYMENT_SETUP.md
- Docker commands → DOCKER_REFERENCE.md
- Troubleshooting → DEPLOYMENT.md
- Step-by-step → DEPLOYMENT_CHECKLIST.md
- What changed → MIGRATION_SUMMARY.md
- Environment vars → .env.example

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 2026 | Initial VPS deployment documentation |

## Notes

- All documentation assumes Ubuntu 20.04+ or similar Linux
- Commands use `docker-compose -f docker-compose.prod.yml` for production
- For development, use `docker-compose up` instead
- SMTP instructions show Gmail as example but any provider works
- SSL certificates auto-renew (no manual action needed)
- Backups should be done regularly (especially .env file)

## Security Reminders

⚠️ **Never commit `.env` file to git**
- Contains sensitive SMTP credentials
- Already in `.gitignore`
- Always keep backup in secure location

⚠️ **Keep SSH credentials secure**
- Don't share VPS login information
- Use SSH keys instead of passwords when possible

⚠️ **Protect your domain registrar account**
- Don't share registrar credentials
- Use strong passwords
- Enable 2FA if available

## Links & Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Certbot Documentation](https://certbot.eff.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Last Updated**: June 2026
**Status**: Complete and Ready for Deployment
**Next Step**: Follow VPS_DEPLOYMENT_SETUP.md
