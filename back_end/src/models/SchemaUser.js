const mongoose = require('mongoose');

const SchemaUser = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  namesOfResponsibles: [{ type: String }],
  contacts: [{ type: Number }],
  observation: [{
    teacherId: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    text: { type: String },
  }],
});

module.exports = mongoose.model('users', SchemaUser);
