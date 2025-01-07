const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  cropId: { type: String, required: true, unique: true },
  commonName: { type: String, required: true },
  specificName: { type: String, required: true },
  cropseason: { type: String, required: true },
  image: { type: String, required: true }, // URL to the crop image
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Crop', cropSchema);
