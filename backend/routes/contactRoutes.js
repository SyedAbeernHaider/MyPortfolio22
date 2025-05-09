const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Validate email configuration
if (!process.env.EMAIL_PASS) {
  console.error('EMAIL_PASS environment variable is not set');
  process.exit(1);
}

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 'haiderabeer794@gmail.com',
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true, // Show debug output
  logger: true // Log information into the console
});

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    throw error;
  }
});

// Contact form submission route
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Test the connection before sending
    await transporter.verify();
    
    // Email content
    const mailOptions = {
      from: {
        name: name,
        address: 'haiderabeer794@gmail.com'
      },
      to: 'haiderabeer794@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      message: 'Message sent successfully!',
      messageId: info.messageId
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error sending message. Please try again.',
      error: error.message
    });
  }
});

module.exports = router; 