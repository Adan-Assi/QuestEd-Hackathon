import React from 'react';
import './ProgressMap.css';

const checkpoints = [
  { label: 'Camp', icon: '🏕️' },
  { label: 'Village', icon: '🏡' },
  { label: 'Castle', icon: '🏰' },
  { label: 'Skyport', icon: '☁️' },
  { label: 'Rocket Launch', icon: '🚀' }
];

const ProgressMap = ({ currentStep = 2 }) => {
  return (
    <div className="progress-map">
      {checkpoints.map((step, index) => (
        <div key={index} className={`checkpoint ${index <= currentStep ? 'active' : ''}`}>
          <span className="icon">{step.icon}</span>
          <p>{step.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ProgressMap;
