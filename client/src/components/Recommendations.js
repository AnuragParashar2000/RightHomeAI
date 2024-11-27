import React, { useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);

    const fetchRecommendations = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/recommendations', {
                userInput: input,
            });
            setResponse(res.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setResponse({ error: 'Failed to fetch recommendations' });
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={fetchRecommendations}>Fetch Recommendations</button>

            {response && (
                <div>
                    <h2>Recommendations</h2>
                    {response.recommendations ? (
                        <ul>
                            {response.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{response.error || 'No recommendations found'}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Recommendations;
