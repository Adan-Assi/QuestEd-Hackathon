import React, { useEffect } from 'react';
import './LevelUpNotification.css';

const LevelUpNotification = ({ level, xpGained, active }) => {
  useEffect(() => {
    // Optional: Add any side effects when the notification becomes active
  }, [active]);

  return (
    <div className={`level-up-notification ${active ? 'active' : ''}`}>
      <div className="level-up-badge">🌟</div>
      <div className="level-up-text">
        <h2>Level Up!</h2>
        <p>You've reached {level.charAt(0).toUpperCase() + level.slice(1)} Level!</p>
        <p className="xp-gain">+{xpGained} XP Gained!</p>
      </div>
    </div>
  );
};

export default LevelUpNotification;
