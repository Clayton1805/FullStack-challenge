const mongoose = require('mongoose');

const SchemaSchools = mongoose.Schema({
  directorId: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  classes: [{
    teacherId: { type: String, required: true },
    grade: { type: Number, required: true, min: 1 },
    className: { type: String },
    observation: [{
      teacherId: { type: String, required: true },
      date: { type: Date, default: Date.now },
      text: { type: String, required: true },
    }],
    studentsId: [{ type: String }],
  }],
});

module.exports = mongoose.model('schools', SchemaSchools);
