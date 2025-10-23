import React, { useEffect, useState } from 'react';

const FuelLevel4_FuelDrive = ({ onComplete }) => {
  const [startDrive, setStartDrive] = useState(false);

  useEffect(() => {
    if (startDrive) {
      setTimeout(() => {
        onComplete();
      }, 4000); // wait for animation
    }
  }, [startDrive, onComplete]);

  return (
    <div className="glucose-drive">
      {!startDrive ? (
        <>
          <h3>🔋 Combine Light + Water + CO₂ to generate Glucose!</h3>
          <div className="reaction-row">
            <span>☀️</span> + <span>💧</span> + <span>CO₂</span> → <strong>🍃 Glucose</strong>
          </div>
          <button onClick={() => setStartDrive(true)}>🚗 Activate Leaf Power!</button>
        </>
      ) : (
        <div className="drive-animation">
          <p>🍃 Energy generated! Let's roll!</p>
          <div className="car-track">
            <div className="leaf-car">🚗💨</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelLevel4_FuelDrive;
