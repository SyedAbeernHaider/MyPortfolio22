const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  github: {
    type: String,
    required: true
  },
  demo: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Full Stack']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema); 