// server/assignments.js
// Assignment routes for KCSD eLearning

const express = require('express');
const router = express.Router();
const authenticate = require('./authMiddleware');
const Assignment = require('./Assignment');
const User = require('./User');

// Get assignments for current user
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    let assignments = [];
    if (user.role === 'student') {
      assignments = await Assignment.find({ 'submissions.student': user._id });
    } else if (user.role === 'teacher') {
      assignments = await Assignment.find({ teacher: user._id });
    } else if (user.role === 'admin') {
      assignments = await Assignment.find();
    }
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit assignment (student)
router.post('/:id/submit', authenticate, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    assignment.submissions.push({ student: req.userId, file: req.body.file });
    await assignment.save();
    res.json({ message: 'Assignment submitted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
