import React, { useState } from 'react';
import './AvatarPage.css';
import Avatar from './Av.png';

const AvatarPage = () => {
  const [coins, setCoins] = useState(120);
  const [avatar, setAvatar] = useState('🧔🏼‍♂️');
  const [purchased, setPurchased] = useState({
    cook: false,
    scientist: false,
    artist: false,
  });

  const handlePurchase = (item, cost, emoji) => {
    if (purchased[item]) {
      alert(`You already own the ${item} costume.`);
      setAvatar(emoji); // Still allow switching costumes
      return;
    }

    if (coins >= cost) {
      setCoins(coins - cost);
      setPurchased({ ...purchased, [item]: true });
      setAvatar(emoji);
      alert(`You have purchased the ${item} costume!`);
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <div className="avatar-page">
      <h2>🧍‍♂️ Customize Your Avatar</h2>
      <div className="avatar-emoji">{avatar}</div>

      <div className="options">
        <button onClick={() => handlePurchase('cook', 50, '👨‍🍳')}>👨‍🍳 Cook - 50 🪙</button>
        <button onClick={() => handlePurchase('scientist', 70, '👨‍🔬')}>👨‍🔬 Scientist - 70 🪙</button>
        <button onClick={() => handlePurchase('artist', 100, '👨‍🎨')}>👨‍🎨 Artist - 100 🪙</button>
      </div>

      <p>Coins: 💰 {coins}</p>

      <img src={Avatar} alt="Avatar" className="avatar-image" />
    </div>

    
  );
};

export default AvatarPage;
