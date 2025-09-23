// server/Course.js
// Mongoose schema for courses in KCSD eLearning

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  image: { type: String },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  units: [
    {
      label: { type: String },
      file: { type: String },
      uploadedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
