const Crop = require('../models/Crop');

// Get all crops
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new crop
exports.addCrop = async (req, res) => {
  const { cropId, commonName, specificName,cropseason, image } = req.body;
  try {
    const newCrop = new Crop({ cropId, commonName, specificName,cropseason, image });
    await newCrop.save();
    res.status(201).json(newCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a crop by custom cropId
exports.updateCrop = async (req, res) => {
  const { cropId } = req.params; // Custom cropId (not MongoDB _id)
  const { commonName, specificName, cropseason, image } = req.body;

  try {
    const updatedCrop = await Crop.findOneAndUpdate(
      { cropId: cropId }, // Search by cropId
      { commonName, specificName, cropseason, image },
      { new: true } // Return the updated document
    );
    
    if (!updatedCrop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.status(200).json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a crop
exports.deleteCrop = async (req, res) => {
  const { id } = req.params;
  try {
    await Crop.findByIdAndDelete(id);
    res.status(200).json({ message: 'Crop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
