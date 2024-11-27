import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const sendMessage = async (message) => {
        setMessages([...messages, { text: message, sender: 'user' }]);
        try {
            const response = await axios.post('http://localhost:5001/chat', { message });
            setMessages([...messages, { text: message, sender: 'user' }, { text: response.data.reply, sender: 'bot' }]);
        } catch (error) {
            console.error('Error in chatbot response:', error);
        }
    };

    return (
        <div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(userInput)}
            />
        </div>
    );
};

export default Chatbot;
