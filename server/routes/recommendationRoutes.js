const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Handle GET request
router.get('/', (req, res) => {
    // This is just an example response. You can modify it as needed.
    res.json({ message: 'Welcome to the recommendations endpoint!' });
});

// Handle POST request for recommendations
router.post('/', recommendationController.getRecommendations);

module.exports = router;
