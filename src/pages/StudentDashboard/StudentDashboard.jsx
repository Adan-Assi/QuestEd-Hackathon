import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './StudentDashboard.css';

import Sidebar from '../../components/Sidebar/Sidebar';
import AvatarStatus from '../../components/AvatarStatus/AvatarStatus';
import XPTrackerCard from '../../components/XPTrackerCard/XPTrackerCard';
import ProgressMap from '../../components/ProgressMap/ProgressMap';
import GameGeneratorModal from '../../components/GameGeneratorModal/GameGeneratorModal';
import AIChatbot from '../../components/AIChatbot/AIChatbot';
import Avatar from './chicken.png'; 

const StudentDashboard = () => {
  const history = useHistory();
  const [showGenerator, setShowGenerator] = useState(false);
  const [avatarMood, setAvatarMood] = useState('happy');

  // Example game progress state (for ProgressMap)
  const gamesCompleted = 3; 

  return (
    <div className="student-dashboard-container">
      <Sidebar />

      <div className="dashboard student-dashboard">
        <h1>Welcome, Student!</h1>

        {/* Avatar Mood Display
        <AvatarStatus mood={avatarMood} /> */}
<div className="student-avatar">
  <img src={Avatar} alt="Student Avatar" />
  <p className="avatar-label">You</p>
</div>

        {/* Game Buttons */}

        <div className="button-grid-student">
          <button className="button-student"

            onClick={() => {
              setAvatarMood('excited');
              history.push('/game');
      
            }}
          >
            🎮 Play Game
          </button>

          <button className="button-student" onClick={() => history.push('/story')}>📖
          Story Mode
          </button>

          <button className="button-student" onClick={() => history.push('/teachmode')}>🧠
          Be the Teacher
          </button>

          <button className="button-student"

            onClick={() => {
              setAvatarMood('excited');
              history.push('/mystery');
            }}
          >
            🎁 Mystery Box
          </button>


          <button className="button-student"

            onClick={() => {
              setAvatarMood('happy');
              history.push('/avatar');
            }}
          >
            👤 Avatar & Rewards
          </button>
        </div>

        {/* XP Card */}
        <XPTrackerCard />

        {/* Progress Map */}
        <ProgressMap currentStep={gamesCompleted} />
      </div>

      {/* Floating AI Chatbot */}
      <AIChatbot />


      {/* Game Generator Modal */}
      {showGenerator && <GameGeneratorModal onClose={() => setShowGenerator(false)} />}
    </div>
  );
};

export default StudentDashboard;
