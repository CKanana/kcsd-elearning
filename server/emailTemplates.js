// KCSD eLearning Email Templates

function accountVerificationTemplate({ name, verificationLink }) {
  return {
    subject: 'KCSD eLearning - Account Verification',
    html: `
      <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 2rem; border-radius: 1rem;">
        <h2 style="color: #ea580c;">Welcome to KCSD eLearning, ${name}!</h2>
        <p>Thank you for creating an account with Kenya Christian School for the Deaf (KCSD) eLearning platform.</p>
        <p>To verify your account and activate access, please click the button below:</p>
        <a href="${verificationLink}" style="display: inline-block; background: #ea580c; color: #fff; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold;">Verify My Account</a>
        <p>If you did not create this account, please ignore this email.</p>
        <br>
        <p style="font-size: 0.95rem; color: #334155;">KCSD eLearning Team</p>
      </div>
    `
  };
}

function passwordResetTemplate({ name, resetLink }) {
  return {
    subject: 'KCSD eLearning - Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 2rem; border-radius: 1rem;">
        <h2 style="color: #ea580c;">KCSD eLearning Password Reset</h2>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password for your KCSD eLearning account.</p>
        <p>To reset your password, click the button below:</p>
        <a href="${resetLink}" style="display: inline-block; background: #ea580c; color: #fff; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold;">Reset My Password</a>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <br>
        <p style="font-size: 0.95rem; color: #334155;">KCSD eLearning Team</p>
      </div>
    `
  };
}

module.exports = { accountVerificationTemplate, passwordResetTemplate };
