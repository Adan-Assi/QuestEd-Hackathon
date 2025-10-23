// components/VoiceSelector.jsx
import React, { useEffect, useState } from "react";

const VoiceSelector = ({ selectedVoice, setSelectedVoice }) => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  return (
    <div className="voice-selector">
      <label style={{ color: 'white', marginBottom: '0.5rem' }}>🎤 Choose Voice:</label>
      <select
        value={selectedVoice?.name || ""}
        onChange={(e) => {
          const voice = voices.find((v) => v.name === e.target.value);
          setSelectedVoice(voice);
        }}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
    </div>
  );
};

export default VoiceSelector;
