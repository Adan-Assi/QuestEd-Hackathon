import React from 'react';
import './GameCard.css';
import { useHistory } from 'react-router-dom';

function GameCard({ id, thumbnail, title, subject, progress }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/singlegame/${id}`);
  };

  return (
    <div className="game_card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="game_thumbnail_wrapper">
        <img src={thumbnail} alt="Game Thumbnail" className="game_thumbnail" />
      </div>

      <h4 className="game_title">{title}</h4>

      <div className="progress_container">
        <div className="progress_bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress_text">{progress}% Complete</p>

      <div className="game_subjectr">
        <p className="game_subject">Subject: {subject}</p>
      </div>
    </div>
  );
}

export default GameCard;
