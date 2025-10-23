import React from 'react';
import './GameGeneratorPreview.css';

const GameGeneratorPreview = () => {
  return (
    <div className="game-preview">
      <h2>🧪 Game Preview</h2>
      <div className="preview-box">
        <h3>Lesson Topic: Fractions</h3>
        <ul>
          <li>🎮 Match numerators and denominators</li>
          <li>🎯 Puzzle with visual pies</li>
          <li>📖 \"Lost Pizza Planet\" story</li>
        </ul>
        <button>Assign Game</button>
      </div>
    </div>
  );
};

export default GameGeneratorPreview;
