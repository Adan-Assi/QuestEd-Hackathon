import React from 'react';
import './FractionCup.css';

const FractionCup = ({ fraction, ingredient, onClick }) => {
  return (
    <div className="fraction-cup-container" onClick={onClick}>
      <div className="fraction-cup">
        <div className="fraction-text">{fraction}</div>
        {ingredient && <div className="ingredient-text">{ingredient}</div>}
      </div>
    </div>
  );
};

export default FractionCup;
