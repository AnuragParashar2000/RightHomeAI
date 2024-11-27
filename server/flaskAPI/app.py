from flask import Flask, request, jsonify
import random
from pymongo import MongoClient
from bson import ObjectId
import datetime  # Importing datetime

app = Flask(__name__)

# MongoDB connection URI (replace with your own connection string)
MONGO_URI = "mongodb+srv://agarwalk444:ashu123456@cluster0.qlrad.mongodb.net/mydatabase?retryWrites=true&w=majority"

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client.mydatabase  # Use your database name here
chat_collection = db.chat  # Collection to store chat messages
recommendations_collection = db.recommendations  # Collection to store recommendations

# Home route
@app.route('/')
def home():
    return 'Welcome to the chatbot API!'

# Chat route to handle user messages
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response_message = generate_chatbot_reply(user_message)
    
    # Save the message and response to MongoDB
    chat_collection.insert_one({
        'user_message': user_message,
        'response': response_message
    })

    return jsonify({'reply': response_message})

# Route to get all chat history from MongoDB
@app.route('/history', methods=['GET'])
def get_chat_history():
    chat_history = list(chat_collection.find())  # Get all chat messages
    # Convert ObjectId to string for JSON serialization
    for message in chat_history:
        message['_id'] = str(message['_id'])
    return jsonify(chat_history)

# Route to get recommendations from MongoDB
@app.route('/getRecommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    recommendations = ["Sample Recommendation 1", "Sample Recommendation 2"]  # Mock recommendations

    # Store the recommendations in MongoDB
    recommendations_collection.insert_one({
        'userId': data.get('userId'),
        'recommendations': recommendations,
        'createdAt': datetime.datetime.utcnow()  # Use the correct datetime function
    })

    if not data:
        return jsonify({"error": "Invalid input"}), 400

    # Return the recommendations as response
    return jsonify({"message": "Recommendations generated", "data": recommendations}), 200

# Favicon route
@app.route('/favicon.ico')
def favicon():
    return '', 204  # You can also use send_from_directory to serve an actual favicon

# Helper function to generate a random chatbot reply
def generate_chatbot_reply(user_message):
    replies = ["Hello, how can I help you?", "Tell me more about what you're looking for.", "Can you clarify that?"]
    return random.choice(replies)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
