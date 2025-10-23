import React, { useState } from 'react';
import './SpellingGame.css';

export default function SpellingGame() {
  const correctWord = 'elephant';
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (input.toLowerCase() === correctWord) {
      setFeedback('✅ Correct!');
    } else {
      setFeedback(`❌ Oops, it's spelled: ${correctWord}`);
    }
  };

  return (
    <div className="spelling-container">
      <h2>Spell the Word</h2>
      <p className="level-badge">Easy</p>
      <button className="audio-btn">🔊 Click to hear the word</button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type the word..."
      />
      <button onClick={handleSubmit} className="submit-btn">Submit</button>
      <p className="feedback">{feedback}</p>
    </div>
  );
}
