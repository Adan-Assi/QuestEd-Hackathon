import React, { useState, useEffect } from 'react';

const FuelLevel3_CO2 = ({ onComplete }) => {
  const [caught, setCaught] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const total = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      if (bubbles.length < total) {
        const id = Date.now();
        const left = Math.floor(Math.random() * 80 + 10);
        const top = Math.floor(Math.random() * 40 + 10);
        setBubbles((prev) => [...prev, { id, left, top }]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [bubbles]);

  const handleClick = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    setCaught((prev) => prev + 1);
  };

  useEffect(() => {
    if (caught >= total) {
      onComplete();
    }
  }, [caught, onComplete]);

  return (
    <div className="co2-level">
      <p>💨 Click 5 floating CO₂ bubbles!</p>
      <p>Collected: {caught}/{total}</p>
      <div className="bubble-area">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="bubble"
            onClick={() => handleClick(b.id)}
            style={{ left: `${b.left}%`, top: `${b.top}%` }}
          >
            CO₂
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuelLevel3_CO2;
