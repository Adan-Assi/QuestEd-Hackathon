import React, { useEffect } from 'react';
import './LevelDownNotification.css';

const LevelDownNotification = ({ level, active }) => {
  useEffect(() => {
    // Optional: Add any side effects when the notification becomes active
  }, [active]);

  return (
    <div className={`level-down-notification ${active ? 'active' : ''}`}>
      <div className="level-down-badge">🌱</div>
      <div className="level-down-text">
        <h2>Let's Practice More</h2>
        <p>You're now at {level.charAt(0).toUpperCase() + level.slice(1)} Level</p>
        <p className="encouragement">Don't worry! This will help you build a stronger foundation.</p>
      </div>
    </div>
  );
};

export default LevelDownNotification;
