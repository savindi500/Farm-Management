const Field = require('../models/Field');

// Get all fields
exports.getFields = async (req, res) => {
  try {
    const fields = await Field.find();
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fields' });
  }
};

// Get a single field by ID
exports.getFieldById = async (req, res) => {
  try {
    const field = await Field.findOne({ fieldID: req.params.id });
    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    }
    res.status(200).json(field);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the field' });
  }
};

// Create a new field
exports.createField = async (req, res) => {
  const { fieldID, fieldName, xCoordinate, yCoordinate, size, images } = req.body;
  try {
    const newField = new Field({ fieldID, fieldName, xCoordinate, yCoordinate, size, images });
    await newField.save();
    res.status(201).json({ message: 'Field created successfully', field: newField });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create field' });
  }
};

// Update a field
exports.updateField = async (req, res) => {
  const { id } = req.params; // Extract ID from params
  const { fieldName, xCoordinate, yCoordinate, size, images } = req.body; // Extract field data from the request body

  try {
    // Find the field using either the fieldID or _id and update it
    const updatedField = await Field.findOneAndUpdate(
      { fieldID: id }, // Search by fieldID instead of _id
      { fieldName, xCoordinate, yCoordinate, size, images },
      { new: true } // Return the updated document
    );
    
    if (!updatedField) {
      return res.status(404).json({ message: 'Field not found' });
    }

    res.status(200).json(updatedField); // Return the updated field data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update a field by custom fieldID
exports.updateField = async (req, res) => {
  const { fieldID } = req.params; // Custom fieldID (not MongoDB _id)
  const { fieldName, xCoordinate, yCoordinate, size, images } = req.body;

  try {
    const updatedField = await Field.findOneAndUpdate(
      { fieldID: fieldID }, // Search by fieldID
      { fieldName, xCoordinate, yCoordinate, size, images },
      { new: true } // Return the updated document
    );

    if (!updatedField) {
      return res.status(404).json({ message: "Field not found" });
    }

    res.status(200).json(updatedField);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a field by MongoDB _id
exports.deleteField = async (req, res) => {
  const { id } = req.params; // MongoDB _id

  try {
    const deletedField = await Field.findByIdAndDelete(id);

    if (!deletedField) {
      return res.status(404).json({ message: "Field not found" });
    }

    res.status(200).json({ message: "Field deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
