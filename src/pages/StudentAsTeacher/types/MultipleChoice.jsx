import React, { useState } from 'react';

const MultipleChoice = ({ level, onComplete, completed }) => {
  const [selected, setSelected] = useState(null);
  const isCorrect = selected === level.correctIndex;

  const handleClick = (i) => {
    if (completed) return;
    setSelected(i);
    onComplete();
  };

  return (
    <div className="multiple-choice">
      {level.choices.map((choice, i) => (
        <button
          key={i}
          className={`choice-btn ${selected === i ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
          onClick={() => handleClick(i)}
        >
          {choice}
        </button>
      ))}

      {selected !== null && (
        <p className={isCorrect ? 'correct-msg' : 'incorrect-msg'}>
          {isCorrect ? '✅ Great job! That was the mistake.' : '❌ Not quite. Try again next time!'}
        </p>
      )}
    </div>
  );
};

export default MultipleChoice;
