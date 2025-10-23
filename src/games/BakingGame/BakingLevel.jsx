import React, { useState, useEffect } from 'react';
import './BakingFractions.css';
import { BowlIcon, ScoopCup } from './BakingIcons';

const BakingLevel = ({ level, onComplete }) => {
  const [bowl, setBowl] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const handleDragStart = (e, scoop) => {
    e.dataTransfer.setData('scoop', JSON.stringify(scoop));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const scoop = JSON.parse(e.dataTransfer.getData('scoop'));
    setBowl([...bowl, scoop]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const getTotal = () => {
    return bowl.reduce((sum, scoop) => sum + scoop.value, 0);
  };

  const handleSubmit = () => {
    const total = parseFloat(getTotal().toFixed(2));
    const match = total === level.target;
    setIsCorrect(match);
    setSubmitted(true);
    if (match) onComplete(10); // award XP
  };

  const handleReset = () => {
    setBowl([]);
    setSubmitted(false);
    setIsCorrect(false);
    setTimeLeft(30);
  };

  // Timer logic
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setSubmitted(true);
          setIsCorrect(false);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  return (
    <div className="baking-level">
      <div className="timer">⏱ {timeLeft}s</div>

      <p className="ai-dialogue">
        🤖 Let's bake <strong>{level.ingredient}</strong>! I need exactly <strong>{level.target} cups</strong>.
        Drag the scoops into the bowl and hit submit!
      </p>

      <div className="ingredients">
        {level.scoops.map((scoop, i) => (
          <ScoopCup
            key={i}
            label={scoop.label}
            draggable
            onDragStart={(e) => handleDragStart(e, scoop)}
          />
        ))}
      </div>

      <div className="bowl-area" onDrop={handleDrop} onDragOver={handleDragOver}>
        <BowlIcon />
        <div className="bowl">
          {bowl.map((scoop, i) => (
            <div key={i} className="bowl-slot">{scoop.label}</div>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} disabled={submitted}>
        ✅ Submit
      </button>
      <button onClick={handleReset} style={{ marginLeft: '1rem' }}>
        🔄 Reset
      </button>

      {submitted && (
        <p className={isCorrect ? 'correct-msg' : 'incorrect-msg'}>
          {isCorrect
            ? '🎉 Correct! Great measuring!'
            : '❌ Time’s up or incorrect amount!'}
        </p>
      )}
    </div>
  );
};

export default BakingLevel;
