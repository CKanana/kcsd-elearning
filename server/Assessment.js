// server/Assessment.js
// Mongoose schema for assessments in KCSD eLearning

const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  type: { type: String, enum: ['Test', 'Quiz'], required: true },
  questions: { type: Number, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  startDate: { type: Date },
  dueDate: { type: Date },
  score: { type: Number },
  certificate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assessment', assessmentSchema);
