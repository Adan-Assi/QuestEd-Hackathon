import React from 'react';
import './Pitcher.css';

const Pitcher = ({ target }) => (
  <div className="pitcher">
    <div className="water-level"></div>
    <div className="pitcher-label">{target}</div>
  </div>
);

export default Pitcher;
