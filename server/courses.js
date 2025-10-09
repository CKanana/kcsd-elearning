// server/courses.js
// Course routes for KCSD eLearning

const express = require('express');
const router = express.Router();
const authenticate = require('./authMiddleware');
const Course = require('./Course');
const User = require('./User');

// Get all courses
router.get('/', authenticate, async (req, res) => {
  try {
    let courses = [];
    const user = await User.findById(req.userId);
    if (user.role === 'student') {
      courses = await Course.find({ students: user._id }).populate('teacher', 'name profilePhoto');
    } else if (user.role === 'teacher') {
      courses = await Course.find({ teacher: user._id }).populate('teacher', 'name profilePhoto');
    } else if (user.role === 'admin') {
      courses = await Course.find().populate('teacher', 'name profilePhoto');
    }
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course details
router.get('/:id', authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher', 'name profilePhoto');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in course (student)
router.post('/:id/enroll', authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!course.students.includes(req.userId)) {
      course.students.push(req.userId);
      await course.save();
    }
    res.json({ message: 'Enrolled in course.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Unenroll from course (student)
router.post('/:id/unenroll', authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    course.students = course.students.filter(s => s.toString() !== req.userId);
    await course.save();
    res.json({ message: 'Unenrolled from course.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
