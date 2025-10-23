import React, { useState } from 'react';
import './DialogueGame.css';

export default function DialogueGame() {
  const [feedback, setFeedback] = useState('');
  const [xp, setXp] = useState(0);

  const handleAnswer = (answer) => {
    if (answer === 'I’m fine.') {
      setFeedback('✅ Great answer!');
      setXp(xp + 10);
    } else {
      setFeedback('❌ Try again.');
    }
  };

  return (
    <div className="dialogue-container">
      <h2>Practice English Conversation</h2>
      <p className="turn">Turn 2 of 5</p>
      <div className="character">
        <div className="avatar">🧑‍🏫</div>
        <div className="speech-bubble">How are you today?</div>
      </div>
      <div className="mic-btn">🎤 Tap to Speak</div>
      <p className="xp">+ {xp} XP</p>
      <div className="options">
        <button onClick={() => handleAnswer("I’m fine.")}>I’m fine.</button>
        <button onClick={() => handleAnswer("Good night.")}>Good night.</button>
      </div>
      <p className="feedback">{feedback}</p>
    </div>
  );
}
