import React from 'react';
import { useHistory } from 'react-router-dom';
import Cake from '../../pictures/cake.jpeg';
import Space from '../../pictures/space.jpeg';
import Pirate from '../../pictures/pirate.jpeg';
import GameCard from '../../components/GameCard/GameCard';
import Sidebar from '../../components/Sidebar/Sidebar';

import './GamePage.css';

const games = [
  {
    id: 1,
    thumbnail: Pirate,
    title: 'Pirate Grammar',
    subject: 'English',
    progress: 80,
  },
  {
    id: 2,
    thumbnail: Space,
    title: 'Space Mission Multiplication',
    subject: 'Math',
    progress: 45,
  },
];

function GamePage() {
  const history = useHistory();

  return (
    <div className="game-page-container">
      <Sidebar />

      <div className="game-page">
        <h1>Generated Games Library</h1>
        <div className="game-card-grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              thumbnail={game.thumbnail}
              title={game.title}
              subject={game.subject}
              progress={game.progress}
            />
          ))}
        </div>
      </div>

      {/* Floating Game Generator Button */}
      <button
        className="float-generate-btn"
        onClick={() => history.push('/game-generator')}
      >
        🧠
      </button>
    </div>
  );
}

export default GamePage;
