import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple server entry point that serves the built app
const serverCode = `
import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Static files - serve client build
const clientPath = path.join(__dirname, 'client');
app.use(express.static(clientPath, { maxAge: '1d' }));

// API routes
app.post('/api/send-email', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    const { name, email, organisation, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get SMTP credentials from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'hello@dimeconsultants.co.ke';

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('SMTP configuration missing');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    function escapeHtml(text) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    // Email to Dime Consultants
    const mailOptions = {
      from: smtpUser,
      to: recipientEmail,
      subject: \`New Contact Form Submission from \${name}\`,
      html: \`
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> \${escapeHtml(name)}</p>
        <p><strong>Email:</strong> \${escapeHtml(email)}</p>
        <p><strong>Organisation:</strong> \${escapeHtml(organisation || 'N/A')}</p>
        <p><strong>Message:</strong></p>
        <p>\${escapeHtml(message).replace(/\\n/g, '<br>')}</p>
      \`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to send email',
    });
  }
});

// SPA fallback - serve index.html for all other routes  
app.use((req, res) => {
  const indexPath = path.join(clientPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(\`Server running on port \${port}\`);
});
`;

// Write the server entry point
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

fs.writeFileSync(path.join(distPath, 'server.mjs'), serverCode);
console.log('✓ Created dist/server.mjs');

// Create index.html in client folder for SPA
const clientPath = path.join(distPath, 'client');
if (!fs.existsSync(clientPath)) {
  fs.mkdirSync(clientPath, { recursive: true });
}

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dime Consultants</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/assets/client/index.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(clientPath, 'index.html'), indexHtml);
console.log('✓ Created dist/client/index.html');
