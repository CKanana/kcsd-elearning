
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { sendMail } = require('./mailer');
const { accountVerificationTemplate, passwordResetTemplate } = require('./emailTemplates');
const User = require('./User');
const multer = require('./uploadMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to check JWT and get user
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Change password route
router.post('/change-password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new password are required.' });
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect.' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Profile photo upload
router.post('/profile/photo', authenticate, multer.single('profilePhoto'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const photoUrl = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.userId, { profilePhoto: photoUrl }, { new: true });
    res.json({ profilePhoto: user.profilePhoto });
  } catch (err) {
    console.error('Photo upload error:', err);
    res.status(500).json({ message: 'Error uploading photo' });
  }
});
// Profile routes
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/profile', authenticate, async (req, res) => {
  try {
    const updateFields = req.body;
    // Prevent email and password changes here for security
    delete updateFields.email;
    delete updateFields.password;
    const user = await User.findByIdAndUpdate(req.userId, updateFields, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating profile' });
  }
});

// Get current logged-in user info
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Define your routes after initializing the router
router.post('/forgot-password', async (req, res) => {
  // Example: send password reset email
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  // Generate a reset token (for demo, use a dummy link)
  const resetToken = 'dummy-token';
  const resetLink = `https://kcsd-elearning.com/reset-password?token=${resetToken}`;
  const mail = passwordResetTemplate({ name: user.name, resetLink });
  try {
    await sendMail({ to: email, subject: mail.subject, html: mail.html });
    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (err) {
    console.error('Error sending password reset email:', err);
    res.status(500).json({ message: 'Error sending password reset email.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your account before logging in.' });
    }
    if (role && user.role !== role) {
      return res.status(403).json({ message: `You are not registered as a ${role}.` });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup route
// Support both JSON and multipart/form-data (for profile photo upload)
// Register route (signup with verification token)
router.post('/register', multer.single('profilePhoto'), async (req, res) => {
  try {
    // If JSON, req.body is parsed; if multipart, multer parses req.body and req.file
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePhoto;
    if (req.file) {
      profilePhoto = `/uploads/${req.file.filename}`;
    }
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      ...(profilePhoto && { profilePhoto }),
      verificationToken,
      isVerified: false
    });
    await user.save();
    // Send account verification email
    const verificationLink = `https://kcsd-elearning.com/verify?token=${verificationToken}`;
    const mail = accountVerificationTemplate({ name, verificationLink });
    try {
      await sendMail({ to: email, subject: mail.subject, html: mail.html });
    } catch (err) {
      console.error('Error sending verification email:', err);
    }
    res.status(201).json({ message: 'Account created successfully. Verification email sent.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify account route
router.get('/verify', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: 'Verification token required.' });
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired verification token.' });
  }
  const user = await User.findOne({ email: decoded.email, verificationToken: token });
  if (!user) return res.status(400).json({ message: 'Invalid or expired verification token.' });
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  res.json({ message: 'Account verified successfully.' });
});

// Request password reset route
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour expiry
  await user.save();
  const resetLink = `https://kcsd-elearning.com/reset-password?token=${resetToken}`;
  const mail = passwordResetTemplate({ name: user.name, resetLink });
  try {
    await sendMail({ to: email, subject: mail.subject, html: mail.html });
    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (err) {
    console.error('Error sending password reset email:', err);
    res.status(500).json({ message: 'Error sending password reset email.' });
  }
});

// Reset password route
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: 'Token and new password required.' });
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired reset token.' });
  }
  const user = await User.findOne({ email: decoded.email, resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired reset token.' });
  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
  res.json({ message: 'Password reset successful.' });
});

// Add other auth routes here (e.g., /login, /register)

// Resend verification email route
router.post('/resend-verification', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found.' });
  if (user.isVerified) return res.status(400).json({ message: 'Account already verified.' });
  // Generate new verification token
  const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  user.verificationToken = verificationToken;
  await user.save();
  // Use localhost for local testing, change to production domain when deploying
  const verificationLink = `http://localhost:5000/api/auth/verify?token=${verificationToken}`;
  const mail = accountVerificationTemplate({ name: user.name, verificationLink });
  try {
    await sendMail({ to: email, subject: mail.subject, html: mail.html });
    res.status(200).json({ message: 'Verification email resent.' });
  } catch (err) {
    console.error('Error resending verification email:', err);
    res.status(500).json({ message: 'Error sending verification email.' });
  }
});

module.exports = router;