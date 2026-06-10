# Quick Start: VPS Deployment for dimeconsultants.africa

## 1. Copy Environment File

After cloning the repository on your VPS, create the `.env` file:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```bash
nano .env
```

## 2. Configure SMTP

Update these fields in `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**For Gmail:** Generate an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

## 3. Configure Email Recipients

The email handler supports **single or multiple recipients**:

### Single Recipient:
```env
RECIPIENT_EMAIL=hello@dimeconsultants.co.ke
```

### Multiple Recipients (comma-separated):
```env
RECIPIENT_EMAIL=hello@dimeconsultants.co.ke,support@dimeconsultants.co.ke
```

The system will send contact form submissions to all listed recipients.

## 4. Build and Run with Docker

```bash
# Build the Docker image
docker-compose -f docker-compose.prod.yml build

# Start the application
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 5. Configure Nginx

Use the Nginx configuration from **DOCKER_VPS_SETUP.md** to set up the reverse proxy for **dimeconsultants.africa**.

## 6. SSL Certificate

Set up Let's Encrypt SSL:

```bash
sudo certbot certonly --nginx -d dimeconsultants.africa -d www.dimeconsultants.africa
```

Then update Nginx config to use the certificate paths.

## Testing Email

Test the email functionality by:

1. Open http://dimeconsultants.africa/contact
2. Fill out the contact form
3. Verify emails arrive at all configured recipients

## Environment Variables Summary

| Variable | Example | Notes |
|----------|---------|-------|
| NODE_ENV | production | Keep as production |
| PORT | 3030 | Used internally (Nginx proxies from 80/443) |
| SMTP_HOST | smtp.gmail.com | Your email provider's SMTP host |
| SMTP_PORT | 587 | Usually 587 or 465 for TLS/SSL |
| SMTP_USER | your-email@gmail.com | Email account for sending |
| SMTP_PASS | app-password | App-specific password (not regular password for Gmail) |
| RECIPIENT_EMAIL | email1@example.com,email2@example.com | Single or comma-separated list |

## Troubleshooting

### Email not sending?
- Check SMTP credentials in `.env`
- Verify firewall allows outbound SMTP (port 587 or 465)
- Check Docker logs: `docker-compose -f docker-compose.prod.yml logs app`
- Ensure emails are properly formatted without spaces after commas

### Application not accessible?
- Verify Docker container is running: `docker-compose -f docker-compose.prod.yml ps`
- Check Nginx is proxying correctly to localhost:3030
- Verify SSL certificate paths in Nginx config

For detailed setup, see **DOCKER_VPS_SETUP.md**.
