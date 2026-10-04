import React, { useState } from "react";
import API_URL from "../../api";
import "./CareerAssistant.css";

function CareerAssistant() {
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim() || loading) return;

        const userMessage = message.trim();

        setMessages((prev) => [
            ...prev,
            { sender: "user", text: userMessage }
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userMessage,
                    uid: localStorage.getItem("uid"),
                    userType: localStorage.getItem("type")
                })
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: data.response }
            ]);

        } catch (error) {
            console.error("Chatbot error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Sorry, I couldn't connect to the Career Assistant."
                }
            ]);
        }

        setLoading(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <>
            {!isOpen && (
                <button
                    className="career-assistant-toggle"
                    onClick={() => setIsOpen(true)}
                >
                    🤖 AI Career Assistant
                </button>
            )}

            {isOpen && (
                <div className="career-assistant">

                    <div className="career-assistant-header">
                        <span>🤖 AI Career Assistant</span>

                        <button
                            className="career-assistant-close"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="career-assistant-body">

                        {messages.length === 0 && (
                            <div className="chat-message bot">
                                <div className="chat-bubble">
                                    Hi! 👋 I'm your AI Career Assistant.

                                    <br /><br />

                                    I can help you with:
                                    <br />
                                    • Career guidance
                                    <br />
                                    • Interview preparation
                                    <br />
                                    • Job search guidance
                                    <br />
                                    • Resume questions

                                    <br /><br />

                                    Try asking:
                                    <br />
                                    "How can I become a software developer?"
                                </div>
                            </div>
                        )}

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-message ${msg.sender}`}
                            >
                                <div className="chat-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="chat-message bot">
                                <div className="chat-bubble">
                                    AI is thinking...
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="career-assistant-input">

                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about careers, jobs..."
                        />

                        <button onClick={sendMessage}>
                            Send
                        </button>

                    </div>

                </div>
            )}
        </>
    );
}

export default CareerAssistant;