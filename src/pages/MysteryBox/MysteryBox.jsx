import React, { useState } from 'react';
import './MysteryBox.css';

const MysteryBox = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="mystery-box">
      <h2>🎁 Daily Mystery Box</h2>
      {!opened ? (
        <button onClick={() => setOpened(true)}>Open Box</button>
      ) : (
        <div>
          <p>🎉 You got a bonus puzzle!</p>
          <p>+50 Coins 💰</p>
          <button onClick={() => setOpened(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MysteryBox;
