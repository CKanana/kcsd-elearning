// server/courses.js
// Course routes for KCSD eLearning

const express = require('express');
const router = express.Router();
const authenticate = require('./authMiddleware');
const Course = require('./Course');
const User = require('./User');
const upload = require('./uploadMiddleware');

// Upload a unit to a course (teacher only)
router.post('/:id/units', authenticate, upload.single('unitFile'), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'teacher') return res.status(403).json({ message: 'Only teachers can upload units' });
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (String(course.teacher) !== String(user._id)) return res.status(403).json({ message: 'Not your course' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const label = req.body.label || req.file.originalname;
    const filePath = '/uploads/' + req.file.filename;
    const unit = { label, file: filePath, uploadedAt: new Date() };
    course.units.push(unit);
    await course.save();
    res.status(201).json({ message: 'Unit uploaded', unit });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Public route: get all courses (no authentication required)
router.get('/public', async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name profilePhoto');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Create a new course (teacher only, with image upload)
router.post('/', authenticate, (req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    upload.single('image')(req, res, next);
  } else {
    next();
  }
}, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'teacher') return res.status(403).json({ message: 'Only teachers can create courses' });
    const { title, description, category, image } = req.body;
    // If file uploaded, use its path; else use image from body (for JSON requests)
    const imagePath = req.file ? '/uploads/' + req.file.filename : image;
    const course = new Course({
      title,
      description,
      category,
      teacher: user._id,
      image: imagePath
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

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

router.get('/teacher/my-students', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'teacher') return res.status(403).json({ message: 'Only teachers can access this' });

    const courses = await Course.find({ teacher: req.userId }).populate('students', 'name email studentId dob profilePhoto role');

    const studentMap = new Map();

    courses.forEach(course => {
      course.students.forEach(student => {
        if (student.role === 'student' && !studentMap.has(student._id.toString())) {
          studentMap.set(student._id.toString(), {
            ...student.toObject(),
            courses: []
          });
        }
        const existing = studentMap.get(student._id.toString());
        if (existing) {
          existing.courses.push({
            title: course.title,
            units: course.units || []
          });
        }
      });
    });

    const students = Array.from(studentMap.values());
    res.json(students);
  } catch (err) {
    console.error('Error fetching teacher students:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get enrolled students for a course
router.get('/:id/students', authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course.students);
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
