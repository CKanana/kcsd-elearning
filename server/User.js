// server/User.js
// Mongoose schema for user accounts in KCSD eLearning

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  name: { type: String, required: true },
  profilePhoto: { type: String },
  studentId: { type: String },
  dob: { type: String },
  emergencyContact: {
    name: { type: String },
    relationship: { type: String },
    phone: { type: String }
  },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  preferences: {
    highContrast: { type: Boolean, default: false },
    fontSize: { type: String, default: 'medium' },
    language: { type: String, default: 'KSL' },
    notifications: {
      grades: { type: Boolean, default: true },
      assignments: { type: Boolean, default: true },
      announcements: { type: Boolean, default: false }
    },
    profileVisibility: { type: String, default: 'teachers' }
  },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
