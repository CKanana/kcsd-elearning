const express = require('express');
const router = express.Router();
const { sendMail } = require('./mailer');

// POST /api/contact
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }
  try {
    await sendMail({
      to: [process.env.EMAIL_FROM || 'info@kcsd-abi.or.ke', 'kenyachristianschoolforthedeaf@yahoo.com'],
      subject: 'New KCSD Program Inquiry',
      text: `A new user is interested in KCSD programs. Email: ${email}`,
      html: `<p>A new user is interested in KCSD programs.</p><p><strong>Email:</strong> ${email}</p>`
    });
    res.json({ message: 'Thank you! We will contact you soon.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
});

module.exports = router;
