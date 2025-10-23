import React, { useState } from 'react';

const ImageSelect = ({ level, onComplete, completed }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    if (completed) return;
    setSelectedIndex(index);
    if (level.images[index].isCorrect) {
      onComplete();
    }
  };

  return (
    <div className="image-select-grid">
      {level.images.map((img, index) => (
        <div
          key={index}
          className={`image-option ${selectedIndex === index ? (img.isCorrect ? 'correct' : 'incorrect') : ''}`}
          onClick={() => handleSelect(index)}
        >
          <img src={img.src} alt={img.label} />
          <p>{img.label}</p>
        </div>
      ))}

      {selectedIndex !== null && (
        <p className={level.images[selectedIndex].isCorrect ? 'correct-msg' : 'incorrect-msg'}>
          {level.images[selectedIndex].isCorrect
            ? '✅ Nice! You picked the correct one.'
            : '❌ Nope! That wasn’t the right choice.'}
        </p>
      )}
    </div>
  );
};

export default ImageSelect;
