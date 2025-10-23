
import React, { useState } from 'react';
import ChemistryLevel from './ChemistryLevel';
import ChemistryQuiz from './ChemistryQuiz';
import './ChemistryConnect.css';

const levels = [
  {
    id: 1,
    target: 'H₂O',
    formula: ['H', 'H', 'O'],
    layout: { O: [1] }, // O should be in the middle
    options: ['H', 'O', 'Cl', 'Na']
  },
  {
    id: 2,
    target: 'CO₂',
    formula: ['O', 'C', 'O'],
    layout: { C: [1] }, // C should be in the middle
    options: ['O', 'C', 'H', 'N']
  },
  {
    id: 3,
    target: 'NaCl',
    formula: ['Na', 'Cl'],
    layout: {}, // No specific layout required
    options: ['Na', 'Cl', 'O', 'K']
  },
  {
    id: 4,
    target: 'CH₄',
    formula: ['C', 'H', 'H', 'H', 'H'],
    layout: { C: [0] }, // C should be first
    options: ['C', 'H', 'O', 'N']
  }
];

const ChemistryGame = () => {
  const [step, setStep] = useState(0);
  const [xp, setXp] = useState(0);
  const [trophies, setTrophies] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleLevelComplete = () => {
    const newXp = xp + 25; // Increased XP gain
    setXp(newXp);

    // Award trophies based on progress
    if (newXp >= 25 && !trophies.includes('🔬 Molecule Novice')) {
      setTrophies([...trophies, '🔬 Molecule Novice']);
    }
    
    if (newXp >= 50 && !trophies.includes('⚗️ Chemistry Student')) {
      setTrophies([...trophies, '⚗️ Chemistry Student']);
    }
    
    if (newXp >= 75 && !trophies.includes('🧪 Bond Master')) {
      setTrophies([...trophies, '🧪 Bond Master']);
    }

    // Advance to next level or show quiz
    if (step < levels.length - 1) {
      setStep(step + 1);
    } else {
      setShowQuiz(true);
    }
  };

  return (
    <div className="chemistry-game">
      <h2>⚛️ Chemistry Connect – Level {step + 1}</h2>
      <div className="xp-bar-wrap">
        <div className="xp-bar" style={{ width: `${Math.min(xp, 100)}%` }} />
      </div>
      <p className="score-bar">⭐ XP: {xp}/100</p>
      <p className="trophies">🏆 Trophies: {trophies.join(' | ') || 'None yet'}</p>

      {showQuiz ? (
        <ChemistryQuiz onRestart={() => {
          setStep(0);
          setXp(0);
          setTrophies([]);
          setShowQuiz(false);
        }} />
      ) : (
        <ChemistryLevel level={levels[step]} onComplete={handleLevelComplete} />
      )}
    </div>
  );
};

export default ChemistryGame;