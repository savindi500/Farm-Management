const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  fieldID: {
    type: String,
    required: true,
    unique: true,
  },
  fieldName: {
    type: String,
    required: true,
  },
  xCoordinate: {
    type: Number,
    required: true,
  },
  yCoordinate: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Field', fieldSchema);
