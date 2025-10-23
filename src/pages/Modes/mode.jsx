import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './mode.css';

const Mode = () => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  //const navigate = useNavigate();
  const history = useHistory();

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
  };

  const handlePlay = () => {
    if (selectedMode === 'Solo' && selectedGrade === 'Eighth Grade') {
      //navigate('/baking');
      history.push('/baking');
    }
  };

  return (
    <div className='mode-container'>
      <div className="modes">
        <h2>Choose Mode</h2>
        <div className="button-grid-modes">
          <button 
            className={`pill-mode ${selectedMode === 'Competitive' ? 'active' : ''}`}
            onClick={() => handleModeSelect('Competitive')}
          >
            Competitive
          </button>
          <button 
            className={`pill-mode ${selectedMode === 'Timer' ? 'active' : ''}`}
            onClick={() => handleModeSelect('Timer')}
          >
            Timer
          </button>
          <button 
            className={`pill-mode ${selectedMode === 'Solo' ? 'active' : ''}`}
            onClick={() => handleModeSelect('Solo')}
          >
            Solo
          </button>
        </div>
      </div>
      
      <div className="Grade">
        <h2>Pick Grade</h2>
        <div className="button-grid-modes">
          <button 
            className={`pill-mode ${selectedGrade === 'Seventh Grade' ? 'active' : ''}`}
            onClick={() => handleGradeSelect('Seventh Grade')}
          >
            Seventh Grade
          </button>
          <button 
            className={`pill-mode ${selectedGrade === 'Eighth Grade' ? 'active' : ''}`}
            onClick={() => handleGradeSelect('Eighth Grade')}
          >
            Eighth Grade
          </button>
          <button 
            className={`pill-mode ${selectedGrade === 'Ninth Grade' ? 'active' : ''}`}
            onClick={() => handleGradeSelect('Ninth Grade')}
          >
            Ninth Grade
          </button>
        </div>
      </div>

      {selectedMode === 'Solo' && selectedGrade === 'Eighth Grade' && (
        <button 
          className="play-button"
          onClick={handlePlay}
        >
          Play Now
        </button>
      )}
    </div>
  );
};

export default Mode;