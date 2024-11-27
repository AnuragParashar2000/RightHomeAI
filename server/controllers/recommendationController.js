const axios = require('axios');
const { MongoClient } = require('mongodb');

// MongoDB URI and database setup
const MONGO_URI = "mongodb+srv://agarwalk444:ashu123456@cluster0.qlrad.mongodb.net/mydatabase?retryWrites=true&w=majority";
const client = new MongoClient(MONGO_URI);
const db = client.db('mydatabase'); // your database name
const recommendationsCollection = db.collection('recommendations'); // collection to store recommendations

exports.getRecommendations = async (req, res) => {
    const userData = req.body;

    try {
        const recommendations = ["Sample Recommendation 1", "Sample Recommendation 2"]; // Mock recommendations

        // Send the request to Flask to generate recommendations (if necessary)
        const response = await axios.post('http://localhost:5001/getRecommendations', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Here, we store the recommendations in MongoDB
        await recommendationsCollection.insertOne({
            userId: userData.userId,
            recommendations: response.data.data, // Assuming this is the recommendations you want to store
            createdAt: new Date()
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with Flask:', error.message);
        res.status(500).json({
            message: 'Error fetching recommendations',
            error: error.message
        });
    }
};
