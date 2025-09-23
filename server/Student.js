// server/Student.js
// Mongoose schema for students in KCSD eLearning

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePhoto: { type: String },
  bio: { type: String },
  email: { type: String, required: true, unique: true },
  // Add more fields as needed
});

module.exports = mongoose.model('Student', studentSchema);
