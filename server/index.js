import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for static file serving
}));

// CORS - Allow requests from frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json({ limit: '10kb' })); // Limit body size

// Rate limiting for contact endpoint - 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    // Validation
    if (!email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Length validation
    if (subject.length > 200) {
      return res.status(400).json({ error: 'Subject too long (max 200 characters).' });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message too long (max 5000 characters).' });
    }

    if (message.length < 10) {
      return res.status(400).json({ error: 'Message too short (min 10 characters).' });
    }

    // Basic spam detection - check for common spam patterns
    const spamPatterns = [
      /\b(viagra|cialis|casino|lottery|winner|million dollars)\b/i,
      /\[url=/i,
      /<a\s+href/i,
      /http[s]?:\/\/[^\s]+\s*http[s]?:\/\//i, // Multiple URLs
    ];

    const isSpam = spamPatterns.some(pattern =>
      pattern.test(message) || pattern.test(subject)
    );

    if (isSpam) {
      // Silently "succeed" for spam to not give feedback to spammers
      console.log('Spam detected from:', email);
      return res.json({ success: true });
    }

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'contact@cesarsalcido.com',
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `
New message from your portfolio website:

From: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from cesarsalcido.com contact form
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0a0a0a; color: #f8f6f2; padding: 20px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 18px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
    .value { margin-top: 5px; }
    .message { background: #f5f5f5; padding: 15px; border-left: 3px solid #c9a66b; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Contact Message</h1>
    </div>
    <div class="field">
      <div class="label">From</div>
      <div class="value">${email}</div>
    </div>
    <div class="field">
      <div class="label">Subject</div>
      <div class="value">${subject}</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="message">${message.replace(/\n/g, '<br>')}</div>
    </div>
    <div class="footer">
      Sent from cesarsalcido.com contact form
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully from:', email);
    res.json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));

  // Handle SPA routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
