import React, { useState, useEffect } from 'react';

const atomStyles = {
  H: { color: '#60a5fa', size: 40 },
  O: { color: '#ef4444', size: 60 },
  C: { color: '#6ee7b7', size: 55 },
  Na: { color: '#fbbf24', size: 50 },
  Cl: { color: '#a78bfa', size: 50 }
};

const ChemistryLevel = ({ level, onComplete }) => {
  const [slots, setSlots] = useState(Array(level.formula.length).fill(null));
  const [activeSlot, setActiveSlot] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Reset slots when level changes
  useEffect(() => {
    setSlots(Array(level.formula.length).fill(null));
    setSubmitted(false);
    setIsCorrect(false);
  }, [level]);

  const handleDragStart = (e, atom) => {
    e.dataTransfer.setData('atom', atom);
  };

  const handleDropOnSlot = (e, index) => {
    e.preventDefault();
    const atom = e.dataTransfer.getData('atom');
    if (!slots[index]) {
      const newSlots = [...slots];
      newSlots[index] = atom;
      setSlots(newSlots);
    }
  };

  const handleSlotClick = (index) => {
    if (slots[index]) {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
    } else {
      setActiveSlot(index);
    }
  };

  const handleAtomClick = (atom) => {
    if (activeSlot !== null && !slots[activeSlot]) {
      const newSlots = [...slots];
      newSlots[activeSlot] = atom;
      setSlots(newSlots);
      setActiveSlot(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = () => {
    // Check if all slots are filled
    if (slots.includes(null)) {
      return;
    }
    
    // For atoms with fixed positions (from layout)
    for (const [atom, positions] of Object.entries(level.layout)) {
      for (const pos of positions) {
        if (slots[pos] !== atom) {
          setIsCorrect(false);
          setSubmitted(true);
          return;
        }
      }
    }
    
    // Check if all required atoms are present (in any order for those without fixed positions)
    const formulaCopy = [...level.formula];
    const slotsCopy = [...slots];
    
    // Remove atoms with fixed positions from both arrays
    for (const [atom, positions] of Object.entries(level.layout)) {
      for (const pos of positions) {
        const formulaIndex = formulaCopy.indexOf(atom);
        if (formulaIndex !== -1) {
          formulaCopy.splice(formulaIndex, 1);
        }
        slotsCopy[pos] = null; // Mark as processed
      }
    }
    
    // Check remaining atoms
    for (const atom of slotsCopy.filter(a => a !== null)) {
      const formulaIndex = formulaCopy.indexOf(atom);
      if (formulaIndex !== -1) {
        formulaCopy.splice(formulaIndex, 1);
      } else {
        setIsCorrect(false);
        setSubmitted(true);
        return;
      }
    }
    
    setIsCorrect(formulaCopy.length === 0);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSlots(Array(level.formula.length).fill(null));
    setSubmitted(false);
    setIsCorrect(false);
    setActiveSlot(null);
  };

  return (
    <div className="chemistry-level">
      <p className="ai-dialogue">
        🤖 Goal: Form <strong>{level.target}</strong>. Drag or click the correct atoms to build the molecule!
      </p>

      <div className="atom-options">
        {level.options.map((atom, index) => (
          <div
            key={index}
            className="atom"
            draggable
            style={{
              backgroundColor: atomStyles[atom]?.color || '#ccc',
              width: atomStyles[atom]?.size,
              height: atomStyles[atom]?.size
            }}
            onDragStart={(e) => handleDragStart(e, atom)}
            onClick={() => handleAtomClick(atom)}
          >
            {atom}
          </div>
        ))}
      </div>

      <div className="reaction-zone">
        {slots.map((atom, index) => (
          <div
            key={index}
            className={`atom-slot ${activeSlot === index ? 'active-slot' : ''}`}
            style={{
              backgroundColor: atom ? atomStyles[atom]?.color : '#e5e7eb',
              width: atom ? atomStyles[atom]?.size : 50,
              height: atom ? atomStyles[atom]?.size : 50,
              border: activeSlot === index ? '3px solid #3b82f6' : '2px dashed #94a3b8',
              opacity: atom ? 1 : 0.7
            }}
            onDrop={(e) => handleDropOnSlot(e, index)}
            onDragOver={handleDragOver}
            onClick={() => handleSlotClick(index)}
          >
            {atom || '?'}
          </div>
        ))}
      </div>

      {/* Bonds visualization */}
      {slots.filter(Boolean).length > 1 && (
        <div className="bond-lines">
          {slots.slice(0, -1).map((_, i) => (
            <div key={`bond-${i}`} className="bond"></div>
          ))}
        </div>
      )}

      <button onClick={handleSubmit} disabled={submitted && isCorrect}>⚗️ React</button>
      <button onClick={handleReset} style={{ marginLeft: '1rem' }}>🔄 Reset</button>
      
      {submitted && isCorrect && (
        <>
          <p className="correct-msg">✅ Molecule formed correctly!</p>
          <p className="ai-explanation">
            🤖 Nice! {level.target} contains: {level.formula.join(', ')}.
          </p>
          <p className="ai-fact">
            💡 Fun Fact: {level.target === 'H₂O' && 'Water is a polar molecule!'}
            {level.target === 'CO₂' && 'CO₂ is exhaled by humans and used by plants for photosynthesis.'}
            {level.target === 'NaCl' && 'Salt forms via ionic bonds between Na+ and Cl-.'}
            {level.target === 'CH₄' && 'Methane is the simplest hydrocarbon and a greenhouse gas.'}
          </p>
          <button onClick={() => onComplete()} className="next-button">Next Level →</button>
        </>
      )}

      {submitted && !isCorrect && (
        <>
          <p className="incorrect-msg">❌ Incorrect atoms or arrangement.</p>
          <p className="ai-error">
            🤖 Hint: {level.target} requires {level.formula.join(' + ')}.
            {level.target === 'CO₂' && ' Try arranging atoms as O-C-O.'}
            {level.target === 'H₂O' && ' Try arranging atoms properly around oxygen.'}
          </p>
        </>
      )}
    </div>
  );
};

export default ChemistryLevel;
