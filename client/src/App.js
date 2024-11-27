import React, { useState } from 'react';

const App = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: 1 }), // Example payload
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch recommendations');
            }
    
            const result = await response.json();
            console.log('Backend response:', result); // Debugging
            setRecommendations(result.data || []); // Adjusted to match the backend response format
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <h1>Recommendations App</h1>
            <button onClick={fetchRecommendations}>Fetch Recommendations</button>
            <h2>Recommendations</h2>
            {loading ? (
                <p>Loading...</p>
            ) : recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations found</p>
            )}
        </div>
    );
};

export default App;
