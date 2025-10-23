import React, { useState, useEffect } from 'react';

const FuelLevel2_Water = ({ onComplete }) => {
  const [drops, setDrops] = useState(['💧', '💧', '💧', '💧', '💧']);
  const [collected, setCollected] = useState(0);
  const [tank, setTank] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const drop = e.dataTransfer.getData('drop');
    setTank([...tank, drop]);
    setCollected(collected + 1);
  };

  const handleDragStart = (e, drop) => {
    e.dataTransfer.setData('drop', drop);
  };

  useEffect(() => {
    if (collected >= 5) {
      onComplete();
    }
  }, [collected, onComplete]);

  return (
    <div className="water-level">
      <p>💧 Drag the water drops into the tank!</p>
      <div className="drop-source">
        {drops.slice(0, 5 - collected).map((drop, i) => (
          <div
            key={i}
            draggable
            onDragStart={(e) => handleDragStart(e, drop)}
            className="drop"
          >
            {drop}
          </div>
        ))}
      </div>

      <div className="drop-target" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <p>🚰 Water Tank ({collected}/5)</p>
        <div className="tank-contents">{tank.map((d, i) => <span key={i}>{d}</span>)}</div>
      </div>
    </div>
  );
};

export default FuelLevel2_Water;
