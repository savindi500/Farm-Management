const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');

// Get all crops
router.get('/', cropController.getAllCrops);

// Add a new crop
router.post('/', cropController.addCrop);



// Delete a crop by ID
router.delete('/:id', cropController.deleteCrop);
router.put('/:cropId', cropController.updateCrop);


module.exports = router;

