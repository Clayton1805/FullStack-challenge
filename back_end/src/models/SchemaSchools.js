const mongoose = require('mongoose');

const SchemaSchools = mongoose.Schema({
  directorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  address: { type: String },
  classes: [{
    teacherId: { type: mongoose.Schema.Types.ObjectId, required: true },
    grade: { type: Number, required: true, min: 1 },
    className: { type: String },
    observation: [{
      teacherId: { type: mongoose.Schema.Types.ObjectId, required: true },
      date: { type: Date, default: Date.now },
      text: { type: String, required: true },
    }],
    studentsId: [{ type: mongoose.Schema.Types.ObjectId }],
  }],
});

module.exports = mongoose.model('schools', SchemaSchools);
