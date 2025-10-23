import React, { useState } from 'react';
import './StudentAsTeacher.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import MultipleChoice from './types/MultipleChoice';
import FillBlanks from './types/FillBlanks';
import DragReorder from './types/DragReorder';
import ImageSelect from './types/ImageSelect';

const levels = [
  {
    type: 'multiple-choice',
    prompt: 'AI: "Photosynthesis uses oxygen to make sugar." What’s the mistake?',
    choices: ['Uses sunlight', 'Uses oxygen', 'Makes protein', 'Uses carbon dioxide'],
    correctIndex: 1
  },
  {
    type: 'fill-blanks',
    prompt: 'AI: "Gravity pushes objects away from Earth." Fix this sentence:',
    sentence: ['Gravity', '__', 'objects', '__', 'Earth.'],
    answers: ['pulls', 'toward']
  },
  {
    type: 'drag-order',
    prompt: 'Reorder the AI’s messy explanation:',
    original: ['is the', 'Photosynthesis', 'plants', 'in', 'process that'],
    correctOrder: ['Photosynthesis', 'is the', 'process that', 'in', 'plants']
  },
  {
    type: 'image-select',
    prompt: 'AI pointed to the wrong cell structure. Choose the correct one:',
    images: [
      { src: '/images/chloroplast.png', label: 'Chloroplast', isCorrect: true },
      { src: '/images/mitochondria.png', label: 'Mitochondria', isCorrect: false },
      { src: '/images/nucleus.png', label: 'Nucleus', isCorrect: false }
    ]
  }
];

const StudentAsTeacher = () => {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const level = levels[step];

  const handleNext = () => {
    if (step < levels.length - 1) {
      setStep(step + 1);
      setCompleted(false);
    } else {
      alert("🎉 You completed all levels!");
    }
  };

  return (
    <div className="teacher-mode-container">
      <Sidebar />
      <div className="teacher-mode">
        <h2>🧠 Be the Teacher – Level {step + 1}</h2>
        <p className="prompt">{level.prompt}</p>

        {level.type === 'multiple-choice' && (
          <MultipleChoice level={level} onComplete={() => setCompleted(true)} completed={completed} />
        )}

        {level.type === 'fill-blanks' && (
          <FillBlanks level={level} onComplete={() => setCompleted(true)} completed={completed} />
        )}

        {level.type === 'drag-order' && (
          <DragReorder level={level} onComplete={() => setCompleted(true)} completed={completed} />
        )}

        {level.type === 'image-select' && (
          <ImageSelect level={level} onComplete={() => setCompleted(true)} completed={completed} />
        )}

        {completed && <button onClick={handleNext}>➡️ Next</button>}
      </div>
    </div>
  );
};

export default StudentAsTeacher;
