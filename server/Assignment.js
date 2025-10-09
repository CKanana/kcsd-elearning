// server/Assignment.js
// Mongoose schema for assignments in KCSD eLearning

const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dueDate: { type: Date },
  questions: { type: Number },
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    file: { type: String },
    submittedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
