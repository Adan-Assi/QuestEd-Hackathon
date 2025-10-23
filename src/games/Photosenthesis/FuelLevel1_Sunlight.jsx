import React, { useState, useEffect } from 'react';

const FuelLevel1_Sunlight = ({ onComplete }) => {
  const [caught, setCaught] = useState(0);
  const total = 5;

  useEffect(() => {
    if (caught >= total) {
      onComplete();
    }
  }, [caught, onComplete]);

  return (
    <div className="sunlight-game">
      <p>☀️ Catch {total} falling sunbeams by clicking on them!</p>
      <div className="sunbeam-zone">
        {Array.from({ length: total - caught }).map((_, i) => (
          <div
            key={i}
            className="sunbeam"
            onClick={() => setCaught(caught + 1)}
          >
            ☀️
          </div>
        ))}
      </div>
      <p>Collected: {caught} / {total}</p>
    </div>
  );
};

export default FuelLevel1_Sunlight;
