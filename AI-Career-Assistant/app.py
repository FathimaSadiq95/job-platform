from flask import Flask, request, jsonify
from flask_cors import CORS

from chatboat import get_response, predict_intent


app = Flask(__name__)

# Allow requests from the React frontend
CORS(app)


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    response = get_response(user_message)
    intent = predict_intent(user_message)

    return jsonify({
        "response": response,
        "intent": intent
    })


@app.route("/", methods=["GET"])
def home():

    return jsonify({
        "message": "AI Career Assistant API is running"
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )