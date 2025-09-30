// Delete an assessment by ID
app.delete('/api/assessments/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndDelete(req.params.id);
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
    res.json({ message: 'Assessment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting assessment', error: err.message });
  }
});
// --- Express, Models, Middleware ---
const express = require('express');
const cors = require('cors');
const connectDB = require('../database/connection');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoutes = require('./auth');
const authenticate = require('./authMiddleware');
const upload = require('./uploadMiddleware');

// --- Model Imports ---
const Student = require('./Student');
const Assessment = require('./Assessment');
const Course = require('./Course');
const User = require('./User');

// --- App Initialization ---
const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));

// --- DB Connection ---
connectDB();

// --- Auth Routes ---
app.use('/api/auth', authRoutes);

// --- Route Handlers ---
// --- Route Handlers ---

// Unenroll from a course
app.post('/api/courses/:id/unenroll', authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const user = await User.findById(req.userId);
    if (!course || !user) return res.status(404).json({ message: 'Course or user not found' });

    // Remove user from course.students
    course.students = course.students.filter(sid => sid.toString() !== user._id.toString());
    // Remove course from user.enrolledCourses
    user.enrolledCourses = user.enrolledCourses.filter(cid => cid.toString() !== course._id.toString());

    await course.save();
    await user.save();
    res.json({ message: 'Unenrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error unenrolling from course', error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all assessments
app.get('/api/assessments', async (req, res) => {
  try {
    const assessments = await Assessment.find().populate('course', 'title');
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('teacher', 'name profilePhoto')
      .populate('students', 'name email');
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single course by ID
app.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher', 'name profilePhoto');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
});

// Get students enrolled in a course
app.get('/api/courses/:id/students', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'students',
      select: 'name email role',
      match: { role: 'student' }
    });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course.students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
});

// Course creation with image upload
app.post('/api/courses', upload.single('image'), async (req, res) => {
  try {
    const { title, description, teacher, category } = req.body;
    if (!teacher) return res.status(400).json({ message: 'Teacher is required.' });
    const teacherUser = await User.findById(teacher);
    if (!teacherUser) return res.status(400).json({ message: 'Invalid teacher ID.' });

    const course = new Course({
      title,
      description,
      teacher,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(400).json({ message: 'Error creating course', error: err.message });
  }
});

// Delete a course by ID
app.delete('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err.message });
  }
});

// Upload a unit file to a course
app.post('/api/courses/:id/units', upload.single('unitFile'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const newUnit = {
      label: req.body.label || req.file.originalname,
      file: `/uploads/${req.file.filename}`
    };
    course.units.push(newUnit);
    await course.save();
    res.status(201).json({ message: 'Unit uploaded', unit: newUnit });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading unit', error: err.message });
  }
});

// Delete a unit from a course
app.delete('/api/courses/:courseId/units/:unitIdx', async (req, res) => {
  try {
    const { courseId, unitIdx } = req.params;
    const course = await Course.findById(courseId);
    if (!course || !course.units[unitIdx]) return res.status(404).json({ message: 'Unit not found' });
    course.units.splice(unitIdx, 1);
    await course.save();
    res.json({ message: 'Unit deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting unit', error: err.message });
  }
});

// Edit a unit label in a course
app.put('/api/courses/:courseId/units/:unitIdx', async (req, res) => {
  try {
    const { courseId, unitIdx } = req.params;
    const { label } = req.body;
    const course = await Course.findById(courseId);
    if (!course || !course.units[unitIdx]) return res.status(404).json({ message: 'Unit not found' });
    course.units[unitIdx].label = label;
    await course.save();
    res.json({ message: 'Unit updated', unit: course.units[unitIdx] });
  } catch (err) {
    res.status(500).json({ message: 'Error updating unit', error: err.message });
  }
});

// Create a new assessment
app.post('/api/assessments', async (req, res) => {
  try {
    const assessment = new Assessment(req.body);
    await assessment.save();
    res.status(201).json(assessment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating assessment', error: err.message });
  }
});

// --- Enrollment Routes ---
app.get('/api/my-courses', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'enrolledCourses',
      populate: { path: 'teacher', select: 'name profilePhoto' }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enrolled courses', error: err.message });
  }
});

app.post('/api/courses/:id/enroll', authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const user = await User.findById(req.userId);
    if (!course || !user) return res.status(404).json({ message: 'Course or user not found' });

    if (!course.students.includes(user._id)) course.students.push(user._id);
    if (!user.enrolledCourses.includes(course._id)) user.enrolledCourses.push(course._id);

    await course.save();
    await user.save();
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error enrolling in course', error: err.message });
  }
});

// --- Server Listen ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
