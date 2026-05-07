# Email Contact Form Setup Guide

## Overview

The contact form now sends emails to `hello@dimeconsultants.co.ke` when users submit the form. The system uses SMTP (Simple Mail Transfer Protocol) to send emails securely.

## Configuration Steps

### Option 1: Using Gmail (Recommended for testing)

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
3. **Set environment variables**:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  (the 16-character password)
   RECIPIENT_EMAIL=hello@dimeconsultants.co.ke
   ```

### Option 2: Using SendGrid (Production-grade)

1. **Sign up for SendGrid**: https://sendgrid.com
2. **Create an API Key** with Mail Send permission
3. **Set environment variables**:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   RECIPIENT_EMAIL=hello@dimeconsultants.co.ke
   ```

### Option 3: Using Resend (Built for developers)

1. **Sign up for Resend**: https://resend.com
2. **Create an API Key**
3. **Update the email handler** to use Resend's SDK instead of nodemailer

### For Local Development

The `wrangler.jsonc` is configured with localhost SMTP settings. To test locally:

```bash
# Install Mailhog (provides local SMTP server)
# macOS: brew install mailhog
# Windows: Download from https://github.com/mailhog/MailHog/releases

# Run Mailhog
mailhog

# View emails at: http://localhost:8025
```

## Deploying to Cloudflare Workers

1. **Update production variables** in `wrangler.jsonc` with your chosen email service credentials
2. **Deploy**:
   ```bash
   npm run build
   wrangler deploy
   ```
3. **Set secrets** (preferred over vars for sensitive data):
   ```bash
   wrangler secret put SMTP_PASS
   ```

## Testing the Form

1. Go to `/contact` on your site
2. Fill in the form and submit
3. Check that:
   - The form shows a success message
   - An email is received at `hello@dimeconsultants.co.ke`
   - The email contains all the submitted form data

## Troubleshooting

- **Email not sending**: Check browser console for API errors. Verify environment variables are set correctly.
- **Authentication error**: Confirm SMTP credentials are correct. For Gmail, ensure App Password is used (not regular password).
- **"Email service not configured"**: Environment variables are missing. Check `wrangler.jsonc` or `.env` file.
- **Emails going to spam**: Add sender email to allowed senders in your email provider's SPF/DKIM settings.
