import React, { useState } from 'react';

const ChemistryQuiz = ({ onRestart }) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is the chemical formula for water?",
      options: ["H₂O", "CO₂", "NaCl", "CH₄"],
      answer: "H₂O"
    },
    {
      question: "Which atom is in the middle of a carbon dioxide molecule?",
      options: ["Oxygen", "Carbon", "Hydrogen", "Nitrogen"],
      answer: "Carbon"
    },
    {
      question: "What type of bond forms between sodium and chlorine?",
      options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
      answer: "Ionic bond"
    },
    {
      question: "How many hydrogen atoms are in a methane molecule (CH₄)?",
      options: ["2", "3", "4", "5"],
      answer: "4"
    }
  ];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="quiz">
      {showResults ? (
        <>
          <h3>Quiz Results</h3>
          <p className="quiz-score">You scored {score} out of {questions.length}!</p>
          
          {score === questions.length && (
            <p className="ai-explanation">🎖️ Perfect! You've mastered chemistry basics!</p>
          )}
          
          {score >= questions.length/2 && score < questions.length && (
            <p className="ai-explanation">👍 Good job! You understand chemistry fundamentals.</p>
          )}
          
          {score < questions.length/2 && (
            <p className="ai-error">📚 Keep studying! Chemistry takes practice.</p>
          )}
          
          <button onClick={onRestart}>Play Again</button>
        </>
      ) : (
        <>
          <h3>Question {currentQuestion + 1}</h3>
          <p>{questions[currentQuestion].question}</p>
          
          <div className="quiz-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChemistryQuiz;