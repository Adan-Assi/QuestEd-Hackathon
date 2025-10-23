// pages/StoryMode.jsx
import React, { useState, useEffect, useRef } from "react";
import "./StoryMode.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const getStorySystemPrompt = () => `
You are a creative and educational AI storyteller. Given a topic, write a short, engaging educational story that feels like a sci-fi or adventure tale. 
Make it imaginative, suitable for students, and include learning elements subtly inside the narrative.
`;

function StoryMode() {
  const [input, setInput] = useState("");
  const [rawStory, setRawStory] = useState("");
  const [displayedStory, setDisplayedStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [reading, setReading] = useState(false);

  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const bgAudioRef = useRef(null);
  const typingAudioRef = useRef(null);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    generateStory(input);
  };

  const handleSurprise = () => {
    const examples = [
      "Newton's First Law",
      "Photosynthesis",
      "Theory of Relativity",
      "Gravity and Black Holes",
      "The Water Cycle"
    ];
    const randomTopic = examples[Math.floor(Math.random() * examples.length)];
    setInput(randomTopic);
    generateStory(randomTopic);
  };

 const generateStory = async (topic) => {
  setDisplayedStory("");
  setRawStory("");
  setIsLoading(true);
  synthRef.current.cancel();
  if (bgAudioRef.current) {
    bgAudioRef.current.volume = 0.4;
    bgAudioRef.current.play();
  }

  try {
    const res = await axios.post("http://localhost:5000/api/ask", {
      system: getStorySystemPrompt(),
      message: `Tell me a fun and educational story about: ${topic}`,
    });

    const story = res.data.reply
      .split(/(?<=[.?!])\s+/) // sentence boundary
      .slice(0, 5)
      .join(" ");

    setRawStory(story);
    setIsLoading(false);
  } catch (err) {
    console.error(err);
    setRawStory("⚠️ Oops! Couldn't connect to the story generator.");
    setIsLoading(false);
  }
};


  useEffect(() => {
    if (!rawStory || rawStory.startsWith("Sorry")) return;

    let index = 0;
    setDisplayedStory("");
    const interval = setInterval(() => {
      setDisplayedStory((prev) => prev + rawStory.charAt(index));
      if (typingAudioRef.current && rawStory.charAt(index).trim()) {
        typingAudioRef.current.currentTime = 0;
        typingAudioRef.current.play();
      }
      index++;
      if (index >= rawStory.length) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [rawStory]);

  const handleReadAloud = () => {
    if (!rawStory) return;
    const allVoices = synthRef.current.getVoices();
    const preferredVoice = allVoices.find(v => v.name === "Google UK English Female");

    const utterance = new SpeechSynthesisUtterance(rawStory);
    utterance.pitch = 1.15;
    utterance.rate = 0.95;
    utterance.volume = 1;
    if (preferredVoice) utterance.voice = preferredVoice;

    synthRef.current.cancel();
    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setReading(true);

    utterance.onend = () => setReading(false);
  };

  const handlePause = () => {
    if (synthRef.current.speaking && !synthRef.current.paused) {
      synthRef.current.pause();
    }
  };

  const handleResume = () => {
    if (synthRef.current.paused) {
      synthRef.current.resume();
    }
  };

  const handleReplay = () => {
    if (!rawStory) return;
    handleReadAloud();
  };

  const handleDownload = () => {
    const blob = new Blob([rawStory], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${input || "story"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="storymode__page">
      <div className="sidebar__container">
        <Sidebar />
      </div>
      <div className="story__headerwrap">
        <h2>🎙 AI-Powered Story Mode</h2>
      <form onSubmit={handleSubmit} className="story__form fancy-form">
  <input
    className="fancy-input"
    type="text"
    placeholder="✨ Enter a topic like 'Photosynthesis' or 'Gravity'"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    required
  />
  <button type="submit" className="pill-button violet">🚀 Generate Story</button>
  <button type="button" onClick={handleSurprise} className="pill-button pink">
    🔀 Surprise Me
  </button>
</form>

        {isLoading && <p className="loading">⏳ Generating your story...</p>}

        {displayedStory && (
          <div className="story__output">
            <h3>📖 Your Learning Story</h3>
            <pre className="story-text">
  {showFullStory
    ? displayedStory
    : displayedStory.split("\n").slice(0, 5).join("\n")}
</pre>

            {!showFullStory &&
              displayedStory.split("\n").length > 5 && (
                <button onClick={() => setShowFullStory(true)} className="continue-button">
                  ➕ Continue Reading
                </button>
              )}

            <div className="voice-controls">
              <button onClick={handleReadAloud}>📖 Read Aloud</button>
              <button onClick={handlePause}>⏸ Pause</button>
              <button onClick={handleResume}>▶️ Resume</button>
              <button onClick={handleReplay}>🔁 Replay</button>
              <button onClick={handleDownload}>📥 Export</button>
            </div>
          </div>
        )}

        <audio ref={bgAudioRef} loop src="https://cdn.pixabay.com/audio/2022/07/31/audio_baa2c3e50f.mp3" />
        <audio ref={typingAudioRef} src="https://cdn.pixabay.com/audio/2022/03/15/audio_3d5e1d2e5f.mp3" preload="auto" />
      </div>
    </div>
  );
}

export default StoryMode;
