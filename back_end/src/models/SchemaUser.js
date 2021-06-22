const mongoose = require('mongoose');

const SchemaUser = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  namesOfResponsibles: [{ type: String }],
  contacts: [{ type: Number }],
});

module.exports = mongoose.model('users', SchemaUser);
