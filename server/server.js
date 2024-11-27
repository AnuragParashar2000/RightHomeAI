const express = require('express');
const cors = require('cors'); // Import cors
const axios = require('axios');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();
const PORT = 5000;

// Use CORS middleware
app.use(cors()); // This allows all origins
app.use(express.json());

// Routes
app.use('/api/recommendations', recommendationRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
