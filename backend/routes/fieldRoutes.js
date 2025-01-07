const express = require('express');
const {
  getFields,
  createField,
  updateField,
  deleteField,
} = require('../controllers/fieldController');

const router = express.Router();

// Routes
router.get('/', getFields);
router.post('/', createField);
router.put('/:fieldID', updateField);
router.delete('/:id', deleteField);

module.exports = router;
