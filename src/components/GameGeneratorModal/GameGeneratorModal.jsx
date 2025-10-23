import React, { useState } from 'react';
import './GameGeneratorModal.css';

const fakeGameDatabase = {
  gravity: {
    type: 'Puzzle',
    objective: 'Match objects with gravitational strength.',
    example: 'Which object falls faster on the Moon?'
  },
  fractions: {
    type: 'Quiz',
    objective: 'Test your understanding of fractions.',
    example: 'What is 1/2 + 1/4?'
  }
};

const GameGeneratorModal = ({ onClose }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const info = fakeGameDatabase[topic.toLowerCase()] || {
        type: 'Challenge',
        objective: 'Complete AI-generated challenges.',
        example: `Solve a challenge related to "${topic}".`
      };
      setResult(info);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>🧠 AI Game Generator</h2>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
        />
        <button onClick={handleGenerate} disabled={!topic}>Generate</button>
        {loading && <p>⏳ Generating game...</p>}
        {result && (
          <div className="result-card">
            <h3>🎯 Type: {result.type}</h3>
            <p><strong>Objective:</strong> {result.objective}</p>
            <p><strong>Example:</strong> {result.example}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameGeneratorModal;
