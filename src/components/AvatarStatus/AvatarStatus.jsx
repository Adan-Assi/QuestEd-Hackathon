import React, { useEffect, useState } from 'react';
import './AvatarStatus.css';

const moods = {
  idle: '/avatars/avatar_idle.png',
  happy: '/avatars/avatar_happy.png',
  sad: '/avatars/avatar_sad.png',
  excited: '/avatars/avatar_excited.gif'
};

const AvatarStatus = ({ mood }) => {
  const [avatarMood, setAvatarMood] = useState('idle');

  useEffect(() => {
    if (mood) {
      setAvatarMood(mood);
      // Reset to idle after 3 seconds
      const timeout = setTimeout(() => setAvatarMood('idle'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [mood]);

  return (
    <div className="avatar-status">
      <img src={moods[avatarMood]} alt="Avatar" />
      <p className="avatar-label">You are feeling: {avatarMood}</p>
    </div>
  );
};

export default AvatarStatus;
