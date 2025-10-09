// server/profile.js
// Profile routes for KCSD eLearning

const express = require('express');
const router = express.Router();
const authenticate = require('./authMiddleware');
const User = require('./User');

// Get profile
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
router.put('/', authenticate, async (req, res) => {
  try {
    const updateFields = req.body;
    delete updateFields.password;
    delete updateFields.email;
    const user = await User.findByIdAndUpdate(req.userId, updateFields, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
