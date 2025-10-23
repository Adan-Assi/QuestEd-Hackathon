import React, { useState } from 'react';
import FuelLevel1_Sunlight from './FuelLevel1_Sunlight';
import FuelLevel2_Water from './FuelLevel2_Water';
import FuelLevel3_CO2 from './FuelLevel3_CO2';
import FuelLevel4_FuelDrive from './FuelLevel4_FuelDrive';
import './FuelMyRide.css';

const FuelMyRideGame = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);

  const handleLevelComplete = (earnedXP) => {
    setXp(xp + earnedXP);
    setLevelComplete(true);
  };

  const goToNextLevel = () => {
    setCurrentLevel(currentLevel + 1);
    setLevelComplete(false);
  };

  const restartGame = () => {
    setCurrentLevel(1);
    setXp(0);
    setLevelComplete(false);
  };

  return (
    <div className="fuel-game">
      <h2>🚗 Fuel My Ride – Level {currentLevel}</h2>

      <div className="xp-bar-wrap">
        <div className="xp-bar" style={{ width: `${xp}%` }} />
        <p>XP: {xp}</p>
      </div>

      <div className="dog-narrator">
        🐶 Max: {
          currentLevel === 1 ? "We need sunlight to power the leaves!" :
          currentLevel === 2 ? "Let's collect some water!" :
          currentLevel === 3 ? "Catch that CO₂!" :
          currentLevel === 4 ? "Ready to roll with glucose?" :
          "You did it!"
        }
      </div>

      {/* Level 1 */}
      {currentLevel === 1 && !levelComplete && (
        <FuelLevel1_Sunlight onComplete={() => handleLevelComplete(25)} />
      )}
      {currentLevel === 1 && levelComplete && (
        <div className="level-complete">
          <h3>🌞 You caught enough sunlight!</h3>
          <button onClick={goToNextLevel}>Next: Water Collection 💧</button>
        </div>
      )}

      {/* Level 2 */}
      {currentLevel === 2 && !levelComplete && (
        <FuelLevel2_Water onComplete={() => handleLevelComplete(25)} />
      )}
      {currentLevel === 2 && levelComplete && (
        <div className="level-complete">
          <h3>💧 You filled the tank with water!</h3>
          <button onClick={goToNextLevel}>Next: Catch CO₂ 💨</button>
        </div>
      )}

      {/* Level 3 */}
      {currentLevel === 3 && !levelComplete && (
        <FuelLevel3_CO2 onComplete={() => handleLevelComplete(25)} />
      )}
      {currentLevel === 3 && levelComplete && (
        <div className="level-complete">
          <h3>💨 You collected the CO₂!</h3>
          <button onClick={goToNextLevel}>Next: Drive with Glucose 🔋</button>
        </div>
      )}

      {/* Level 4 */}
      {currentLevel === 4 && !levelComplete && (
        <FuelLevel4_FuelDrive onComplete={() => handleLevelComplete(25)} />
      )}
      {currentLevel === 4 && levelComplete && (
        <div className="level-complete">
          <h3>🎉 You powered the car with Photosynthesis!</h3>
          <p>🏆 Trophy Unlocked: Leaf Racer</p>
          <button onClick={restartGame}>🔁 Play Again</button>
        </div>
      )}
    </div>
  );
};

export default FuelMyRideGame;
