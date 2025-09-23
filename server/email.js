const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send a verification email to the user
 * @param {string} to - recipient email
 * @param {string} token - verification token
 */
async function sendVerificationEmail(to, token) {
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL, // must be a verified sender in SendGrid
    subject: 'Verify your email address',
    html: `<p>Thank you for signing up! Please verify your email by clicking the link below:</p>
           <a href="${verificationUrl}">${verificationUrl}</a>`
  };
  await sgMail.send(msg);
}

/**
 * Send a password reset email to the user
 * @param {string} to - recipient email
 * @param {string} token - password reset token
 */
async function sendPasswordResetEmail(to, token) {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: 'Reset your password',
    html: `<p>You requested a password reset. Click the link below to set a new password:</p>
           <a href="${resetUrl}">${resetUrl}</a>
           <p>If you did not request this, you can ignore this email.</p>`
  };
  await sgMail.send(msg);
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
