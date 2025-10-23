import React from 'react';
import './MeasuringCup.css';

const MeasuringCup = ({ initialFillPercentage = 50 }) => {
  // Calculate the water level based on percentage
  const waterHeight = `${initialFillPercentage}%`;
  
  // Measurement markers - positioned at different heights
  const markers = [
    { id: 1, position: 20, label: '1/4' },
    { id: 2, position: 40, label: '1/2' },
    { id: 3, position: 60, label: '3/4' },
    { id: 4, position: 80, label: '1' },
    { id: 5, position: 90, label: '1 1/4' },
  ];
  
  return (
    <div className="measuring-cup-container">
      <div className="measuring-cup">
        {/* Cup body */}
        <div className="cup-body">
          {/* Handle */}
          <div className="cup-handle"></div>
          
          {/* Water fill */}
          <div 
            className="water-fill"
            style={{ height: waterHeight }}
          ></div>
          
          {/* Measurement markers */}
          {markers.map((marker) => (
            <div 
              key={marker.id}
              className={`marker ${initialFillPercentage >= marker.position ? 'submerged' : ''}`}
              style={{ bottom: `${marker.position}%` }}
            >
              <span className="marker-line"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeasuringCup;
