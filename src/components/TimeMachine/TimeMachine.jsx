import React, { useState, useEffect } from "react";
import "./TimeMachine.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

import Einstine from "./avatars/einstein.png";
import Newton from "./avatars/newton.png";
import Marie from "./avatars/marie.png";

const figures = {
  Einstein: { avatar: Einstine },
  Newton: { avatar: Newton },
  "Marie Curie": { avatar: Marie },
};

const TimeMachine = () => {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (selected && selected !== "Other") {
      const greetings = {
        Einstein: "Hello! I'm Einstein. Ask me anything about time, space, or physics!",
        Newton: "Greetings! I'm Sir Isaac Newton. How can I enlighten you today?",
        "Marie Curie": "Hi there! I'm Marie Curie. Curious about science or radioactivity?",
      };
      const figureMessage = {
        from: "figure",
        text: greetings[selected] || "Hello! How can I help you?",
        name: selected,
      };
      setChat([figureMessage]);
    } else if (selected === "Other") {
      setChat([
        {
          from: "figure",
          text: "You've selected a different historical figure. (This option is not yet interactive.)",
          name: "Other",
        },
      ]);
    }
  }, [selected]);

  const getSystemPrompt = (name) => {
    const prompts = {
      Einstein: "You are Albert Einstein speaking to curious teenagers aged 13–16. Answer questions with fun, inspiring, and very short (1–2 line) answers. Keep it simple and enthusiastic.",
      Newton: "You are Isaac Newton speaking to teens aged 13–16. Use friendly, short answers (1–2 lines) that explain concepts clearly and wisely.",
      "Marie Curie": "You are Marie Curie speaking to teens aged 13–16. Keep answers short (1–2 lines), warm, and encouraging about science and discovery.",
    };
    return prompts[name] || "You are a helpful historical figure talking to teenage students. Keep answers very short, clear, and kind.";
  };

  const handleAsk = async () => {
    if (selected && question.trim()) {
      const userMessage = { from: "user", text: question };
      setChat((prev) => [...prev, userMessage]);
      setQuestion("");
      setLoading(true);

      try {
        const res = await axios.post("http://localhost:5000/api/ask", {
          system: getSystemPrompt(selected),
          message: question,
        });

        // ✂️ Limit figure's reply to max 5 non-empty lines
        const limitedReply = res.data.reply
          .split("\n")
          .filter(line => line.trim() !== "")
          .slice(0, 2)
          .join("\n");

        const figureMessage = {
          from: "figure",
          text: limitedReply,
          name: selected,
        };

        setChat((prev) => [...prev, figureMessage]);
      } catch (err) {
        setChat((prev) => [
          ...prev,
          {
            from: "figure",
            text: "Oops! Something went wrong connecting to the AI.",
            name: selected,
          },
        ]);
      }

      setLoading(false);
    }
  };

  return (
    <div className="time-machine-container">
      <Sidebar />
      <div className="time-machine">
        <h2 className="header-title">🔮 Echoes Of The Past</h2>
        <label className="select-label">Select a historical figure:</label>
        <select
          className="styled-select"
          onChange={(e) => {
            setSelected(e.target.value);
            setQuestion("");
          }}
          value={selected}
        >
          <option value="">-- Choose a character --</option>
          {Object.keys(figures).map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
          <option value="Other">Other Historical Figure</option>
        </select>

        {selected && (
          <div className="qa-section">
            <div className="figure-info centered-avatar">
              {selected === "Einstein" ? (
                <iframe
                  src="https://tenor.com/embed/8735407"
                  width="300"
                  height="200"
                  frameBorder="0"
                  allowFullScreen
                  title="Einstein GIF"
                ></iframe>
              ) : selected === "Newton" ? (
                <iframe
                  src="https://giphy.com/embed/mErNeQEVVBiYfBEcdM"
                  width="300"
                  height="200"
                  frameBorder="0"
                  allowFullScreen
                  title="Newton GIF"
                ></iframe>
              ) : selected === "Marie Curie" ? (
                <iframe
                  src="https://giphy.com/embed/bEc0Vgf1Bf4D06D1UV"
                  width="300"
                  height="200"
                  frameBorder="0"
                  allowFullScreen
                  title="Marie Curie GIF"
                ></iframe>
              ) : null}

              <div className="figure-name">{selected}</div>
            </div>

            <div className="chat-box">
              {chat.map((entry, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${entry.from === "user" ? "user" : "figure"}`}
                >
                  {entry.from === "figure" && <strong>{entry.name}:</strong>} {entry.text}
                </div>
              ))}
            </div>

            <div className="input-row">
              <input
                type="text"
                placeholder={`Ask ${selected} a question...`}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                className="chat-input"
              />
              <button onClick={handleAsk} className="ask-button">🧠 Ask</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeMachine;
