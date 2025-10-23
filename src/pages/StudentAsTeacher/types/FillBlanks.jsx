import React, { useState } from 'react';

const FillBlanks = ({ level, onComplete, completed }) => {
  const [inputs, setInputs] = useState(level.answers.map(() => ''));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (i, value) => {
    const updated = [...inputs];
    updated[i] = value;
    setInputs(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = inputs.every((val, i) =>
      val.trim().toLowerCase() === level.answers[i].toLowerCase()
    );
    if (allCorrect) onComplete();
  };

  const isCorrect = inputs.every(
    (val, i) => val.trim().toLowerCase() === level.answers[i].toLowerCase()
  );

  return (
    <div className="fill-blanks">
      <p className="sentence-part">Gravity</p>
      <input
        className="blank-input"
        type="text"
        value={inputs[0]}
        onChange={(e) => handleChange(0, e.target.value)}
        disabled={completed || submitted}
      />
      <p className="sentence-part">objects</p>
      <input
        className="blank-input"
        type="text"
        value={inputs[1]}
        onChange={(e) => handleChange(1, e.target.value)}
        disabled={completed || submitted}
      />
      <p className="sentence-part">Earth.</p>

      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit}>
          Check
        </button>
      )}

      {submitted && (
        <p className={isCorrect ? 'correct-msg' : 'incorrect-msg'}>
          {isCorrect
            ? '✅ Well done! All blanks correct.'
            : '❌ Some answers are incorrect.'}
        </p>
      )}
    </div>
  );
};

export default FillBlanks;
