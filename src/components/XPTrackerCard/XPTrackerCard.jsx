import React from 'react';
import './XPTrackerCard.css';

const XPTrackerCard = () => {
  const gamesCompleted = 12;
  const xp = 340;
  const levelXP = 500;

  const percentage = (xp / levelXP) * 100;

  return (
    <div className="xp-card">
      <h3>🎯 Progress Tracker</h3>
      <p>Games Completed: {gamesCompleted}</p>
      <p>XP: {xp}/{levelXP}</p>
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p className="badge">🏆 Level 3 - Explorer</p>
    </div>
  );
};

export default XPTrackerCard;
