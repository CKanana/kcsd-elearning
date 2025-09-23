
const express = require('express');
const router = express.Router();
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
  // Your forgot-password logic here
  res.status(200).json({ message: 'Forgot password endpoint hit' });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Email verification check temporarily disabled
    // if (!user.isVerified) {
    //   return res.status(403).json({ message: 'Please verify your email before logging in.' });
    // }
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
router.post('/signup', multer.single('profilePhoto'), async (req, res) => {
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
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      ...(profilePhoto && { profilePhoto })
    });
    await user.save();
    res.status(201).json({ message: 'Account created successfully.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add other auth routes here (e.g., /login, /register)

module.exports = router;