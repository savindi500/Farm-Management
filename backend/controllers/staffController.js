const Staff = require('../models/Staff');

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    console.error('Error fetching staff data:', error);
    res.status(500).json({ error: 'Error fetching staff data' });
  }
};

// Add a new staff member
exports.addStaff = async (req, res) => {
  const { firstName, email, contact, designation, role, address, gender, joinedDate, dob } = req.body;
  try {
    const newStaff = new Staff({
      firstName, 
      email, 
      contact, 
      designation, 
      role, 
      address, 
      gender, 
      joinedDate, 
      dob
    });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update a staff member
exports.updateStaff = async (req, res) => {
  const { id } = req.params; // Extract ID from params
  const {
    firstName,
    email,
    contact,
    designation,
    role,
    address,
    gender,
    joinedDate,
    dob,
  } = req.body; // Extract fields from the request body
  
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { firstName, email, contact, designation, role, address, gender, joinedDate, dob },
      { new: true } // Return the updated document
    );
    
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a staff member
exports.deleteStaff = async (req, res) => {
  const { id } = req.params; // Extract ID from params
  try {
    const deletedStaff = await Staff.findByIdAndDelete(id);
    
    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
