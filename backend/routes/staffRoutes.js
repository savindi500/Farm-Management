const express = require('express');
const {
  getAllStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} = require('../controllers/staffController');

const router = express.Router();

// Routes
router.get('/', getAllStaff);
router.post('/', addStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;
