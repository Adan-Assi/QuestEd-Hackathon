import React from 'react';
import './MixingBowl.css';

const MixingBowl = ({ selectedCups }) => {
  // Calculate fill level based on selected cups
  const fillLevel = selectedCups.length > 0 
    ? Math.min(selectedCups.reduce((total, cup) => total + cup.value, 0) * 100 / 2, 100) 
    : 0;
  
  return (
    <div className="mixing-bowl-container">
      <div className="mixing-bowl">
        {/* Bowl content/fill */}
        <div 
          className="bowl-content"
          style={{ height: `${fillLevel}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MixingBowl;
