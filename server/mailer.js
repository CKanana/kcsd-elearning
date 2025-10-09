const axios = require('axios');

async function sendMail({ to, subject, text, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.EMAIL_FROM || process.env.RESEND_EMAIL_FROM || process.env.EMAIL_USER;
  const service = process.env.EMAIL_SERVICE || 'resend';
  if (service !== 'resend') {
    throw new Error('Only Resend email service is supported in this configuration.');
  }
  try {
    const response = await axios.post('https://api.resend.com/emails', {
      from: sender,
      to,
      subject,
      text,
      html
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (err) {
    console.error('Resend email error:', err.response ? err.response.data : err);
    throw err;
  }
}

module.exports = { sendMail };