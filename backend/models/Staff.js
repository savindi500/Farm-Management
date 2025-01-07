const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  designation: { type: String, required: true },
  role: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  joinedDate: { type: Date, required: true },
  dob: { type: Date, required: true },
});

module.exports = mongoose.model('Staff', staffSchema);
