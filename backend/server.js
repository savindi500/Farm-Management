require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cropRoutes = require('./routes/cropRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const staffRoutes = require('./routes/staffRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// API routes
app.use('/api/crops', cropRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => res.send('Farm Management API is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
