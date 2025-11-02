const express = require('express');
const router = express.Router();
const { sendMail } = require('./mailer');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, question } = req.body;
  if (!name || !email || !question) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }
  try {
    await sendMail({
  to: ['info@kcsd.or.ke'],
      subject: 'New KCSD Contact Form Submission',
      text: `New contact form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${question}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${question}</p>`
    });
    res.json({ message: 'Thank you for contacting us! We will get back to you soon.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
});

module.exports = router;
