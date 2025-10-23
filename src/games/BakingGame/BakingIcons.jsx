// BakingIcons.jsx
import React from 'react';
import './BakingFractions.css';

export const BowlIcon = () => (
  <div className="bowl-icon">
    <div className="bowl-inner" />
  </div>
);

export const MeasuringPitcher = () => (
  <div className="measuring-pitcher">
    <div className="pitcher-lines">
      <div />
      <div />
      <div />
    </div>
  </div>
);

export const ScoopCup = ({ label, onClick, draggable, onDragStart }) => (
  <div
    className="scoop-cup"
    onClick={onClick}
    draggable={draggable}
    onDragStart={onDragStart}
  >
    <span>{label}</span>
  </div>
);
