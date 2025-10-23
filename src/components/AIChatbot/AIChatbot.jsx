import React, { useState } from "react";
import axios from "axios";
import "./AIChatbot.css";

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your learning assistant. How can I help?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

const getAIResponse = async (userText) => {
  try {
    const res = await axios.post("http://localhost:5000/api/ask", {
      system: "You are a helpful and friendly AI learning assistant.",
      message: userText,
    });
    return res.data.reply;
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn't connect to the AI server.";
  }
};


const handleSend = async () => {
  const trimmed = userInput.trim();
  if (!trimmed) return;

  const newUserMessage = { sender: "user", text: trimmed };
  setMessages((prev) => [...prev, newUserMessage]);
  setUserInput("");
  setLoading(true);

  // ✅ THIS IS WHERE YOU CALL IT
  const aiReply = await getAIResponse(trimmed);

  const newBotMessage = { sender: "bot", text: aiReply };
  setMessages((prev) => [...prev, newBotMessage]);

  setLoading(false);
};


  return (
    <>
      <button className="chatbot-button" onClick={() => setOpen(!open)}>
        💬
      </button>
      {open && (
        <div className="chatbot-panel">
          <h4>AI Assistant</h4>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <p key={i} className={msg.sender}>
                {msg.text}
              </p>
            ))}
            {loading && <p className="bot">Typing...</p>}
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
