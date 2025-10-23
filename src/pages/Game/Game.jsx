import React from 'react';
import './Game.css';

const Game = () => {
  return (
    <div className="game">
      <h2>🎮 Game Mode</h2>
      <div className="question-box">
        <p>What is 3/4 + 1/4?</p>
        <div className="answers">
          <button>1</button>
          <button>1.25</button>
          <button>0.75</button>
          <button>0.5</button>
        </div>
      </div>
    </div>
  );
};

export default Game;