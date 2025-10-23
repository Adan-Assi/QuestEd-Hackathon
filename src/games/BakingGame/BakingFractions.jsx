import React, { useState, useEffect, useRef } from "react";
import "./BakingFractions.css";
import "./MeasuringCup.css";
import "./FractionCup.css";
import "./MixingBowl.css";
import "./Confetti.css";
import "./LevelUpNotification.css";
import "./LevelDownNotification.css";

import successSound from "./success-sound.mp3";
import levelUpSound from "./level-up-sound.mp3";
import levelDownSound from "./level-down-sound.mp3";
import LevelUpNotification from "./LevelUpNotification";
import LevelDownNotification from "./LevelDownNotification";

// Sound effect component
const SoundEffect = ({ play, soundUrl }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }, [play, soundUrl]);

  return <audio ref={audioRef} src={soundUrl} preload="auto" />;
};

// Confetti component
const Confetti = ({ active }) => {
  const confettiRef = useRef(null);
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (active) {
      // Generate confetti pieces
      const pieces = [];
      const colors = [
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFEB3B",
        "#FFC107",
        "#FF9800",
        "#FF5722",
      ];

      for (let i = 0; i < 150; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          y: -20 - Math.random() * 100,
          size: 5 + Math.random() * 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          speed: 1 + Math.random() * 3,
        });
      }

      setConfettiPieces(pieces);

      // Clean up after animation
      const timer = setTimeout(() => {
        setConfettiPieces([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div
      className={`confetti-container ${active ? "active" : ""}`}
      ref={confettiRef}
    >
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDuration: `${3 / piece.speed}s`,
          }}
        />
      ))}
    </div>
  );
};

// MeasuringCup component
const MeasuringCup = ({ initialFillPercentage = 50 }) => {
  // Calculate the water level based on percentage
  const waterHeight = `${initialFillPercentage}%`;

  // Measurement markers - positioned at different heights
  const markers = [
    { id: 1, position: 20, label: "1/4" },
    { id: 2, position: 40, label: "1/2" },
    { id: 3, position: 60, label: "3/4" },
    { id: 4, position: 80, label: "1" },
    { id: 5, position: 90, label: "1 1/4" },
  ];

  return (
    <div className="measuring-cup-container">
      <div className="measuring-cup">
        {/* Cup body */}
        <div className="cup-body">
          {/* Handle */}
          <div className="cup-handle"></div>

          {/* Water fill */}
          <div className="water-fill" style={{ height: waterHeight }}></div>

          {/* Measurement markers */}
          {markers.map((marker) => (
            <div
              key={marker.id}
              className={`marker ${
                initialFillPercentage >= marker.position ? "submerged" : ""
              }`}
              style={{ bottom: `${marker.position}%` }}
            >
              <span className="marker-line"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// FractionCup component
const FractionCup = ({ fraction, ingredient, value, onDragStart }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ fraction, value }));
    onDragStart(fraction, value);
  };

  return (
    <div
      className="fraction-cup-container"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <div className="fraction-cup">
        <div className="fraction-text">{fraction}</div>
        {/* {ingredient && <div className="ingredient-text">{ingredient}</div>} */}
      </div>
    </div>
  );
};

// MixingBowl component
const MixingBowl = ({ selectedCups, onDrop }) => {
  // Calculate fill level based on selected cups
  const fillLevel =
    selectedCups.length > 0
      ? Math.min(
          (selectedCups.reduce((total, cup) => total + cup.value, 0) * 100) / 2,
          100
        )
      : 0;

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      onDrop(data);
    } catch (error) {
      console.error("Error parsing dropped data:", error);
    }
  };

  return (
    <div
      className="mixing-bowl-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="mixing-bowl">
        {/* Bowl content/fill */}
        <div className="bowl-content" style={{ height: `${fillLevel}%` }}>
          {selectedCups.length > 0 && (
            <div className="bowl-ingredients">
              {selectedCups.map((cup, index) => (
                <div key={index} className="bowl-ingredient-label">
                  {cup.fraction}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bowl-shine"></div>
        <div className="bowl-shadow"></div>
      </div>
    </div>
  );
};

// Level Badge component
const LevelBadge = ({ level }) => {
  const levelColors = {
    easy: "#8BC34A",
    medium: "#FFC107",
    hard: "#FF9800",
    expert: "#F44336",
  };

  return (
    <div
      className="level-badge"
      style={{ backgroundColor: levelColors[level] }}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </div>
  );
};

// Main BakingFractions component
const BakingFractions = () => {
  // State for game mechanics
  const [selectedCups, setSelectedCups] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [draggedCup, setDraggedCup] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [playSuccessSound, setPlaySuccessSound] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0); // Add a key to force re-render

  // State for level-up celebration
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [playLevelUpSound, setPlayLevelUpSound] = useState(false);
  const [levelUpKey, setLevelUpKey] = useState(0);
  const [newLevel, setNewLevel] = useState("");
  const [xpGained, setXpGained] = useState(0);

  // State for level-down notification
  const [showLevelDown, setShowLevelDown] = useState(false);
  const [playLevelDownSound, setPlayLevelDownSound] = useState(false);
  const [levelDownKey, setLevelDownKey] = useState(0);
  const [previousLevel, setPreviousLevel] = useState("");

  // State for difficulty progression
  const [level, setLevel] = useState("easy");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  // Difficulty levels configuration with specific questions
  const difficultyLevels = {
    easy: {
      fractionCups: [
        { id: 1, fraction: "1/4", value: 1 / 4 },
        { id: 2, fraction: "1/5", value: 1 / 5 },
        { id: 3, fraction: "3/4", value: 3 / 4 },
        //{ id: 4, fraction: "1", value: 1 },
        { id: 5, fraction: "1 1/2", value: 1.5 },
      ],
      recipes: [
        {
          ingredient: "sugar",
          baseFraction: "3/4",
          multiplier: 2,
          target: "1 1/2",
          question:
            "Emma is baking muffins. She uses 3/4 cup of sugar for one batch. If she wants to make 2 batches, how much sugar will she need in total?",
        },
        {
          ingredient: "butter",
          baseFraction: "1/2",
          multiplier: 0.5,
          target: "1/4",
          question:
            "A cookie recipe requires 1/2 cup of butter. If you want to make half of the recipe, how much butter do you need?",
        },
        {
          ingredient: "milk",
          baseFraction: "2/5",
          multiplier: 0.5,
          target: "1/5",
          question:
            "A pancake recipe calls for 2/5 cup of milk. You're making half the recipe. How much milk do you need?",
        },
      ],
    },
    medium: {
      fractionCups: [
        //{ id: 1, fraction: "1/4", value: 1/4 },
        { id: 2, fraction: "11/12", value: 11 / 12 },
        { id: 3, fraction: "1/2", value: 1 / 2 },
        { id: 4, fraction: "2/3", value: 2 / 3 },
        //{ id: 5, fraction: "3/4", value: 3/4 },
        //{ id: 6, fraction: "1", value: 1 },
        { id: 7, fraction: "2", value: 2 },
      ],
      recipes: [
        {
          ingredient: "milk",
          baseFraction: "2/3",
          multiplier: 1.375,
          target: "1/2",
          question:
            "Liam is preparing a cake that needs 2/3 cup of milk. He accidentally pours in 1/6 cup more than needed. How much milk did he use in total?",
        },
        {
          ingredient: "flour",
          baseFraction: "1 1/2",
          multiplier: 3,
          target: "4 1/2",
          question:
            "A bread recipe calls for 1 1/2 cups of flour. If Sarah wants to make 3 loaves, how much flour will she need?",
        },
      ],
    },
    hard: {
      fractionCups: [
        //{ id: 1, fraction: "1/5", value: 1/5 },
        { id: 2, fraction: "1/4", value: 1 / 4 },
        { id: 3, fraction: "1/3", value: 1 / 3 },
        { id: 4, fraction: "2/5", value: 2 / 5 },
        { id: 5, fraction: "1/20", value: 1 / 20 },
        //{ id: 6, fraction: "3/5", value: 3/5 },
        { id: 7, fraction: "3/4", value: 3 / 4 },
        //{ id: 8, fraction: "5/8", value: 5/8 }
      ],
      recipes: [
        {
          ingredient: "sugar",
          baseFraction: "3/4",
          multiplier: 0.467,
          target: "7/20",
          question:
            "A pie recipe requires 3/4 cup of sugar. If you have already added 2/5 cup, how much more sugar do you need to add?",
        },
        {
          ingredient: "chocolate chips",
          baseFraction: "5/8",
          multiplier: 4,
          target: "2 1/2",
          question:
            "A baker uses 5/8 cup of chocolate chips for each batch of cookies. If he makes 4 batches, how many cups of chocolate chips does he use in total?",
        },
      ],
    },
    expert: {
      fractionCups: [
        { id: 1, fraction: "1/8", value: 1 / 8 },
        { id: 2, fraction: "1/4", value: 1 / 4 },
        //{ id: 3, fraction: "1/3", value: 1/3 },
        //{ id: 4, fraction: "2/5", value: 2/5 },
        { id: 5, fraction: "1/2", value: 1 / 2 },
        //{ id: 6, fraction: "2/3", value: 2/3 },
        { id: 7, fraction: "3/4", value: 3 / 4 },
        //{ id: 8, fraction: "5/6", value: 5/6 },
        { id: 9, fraction: "1", value: 1 },
      ],
      recipes: [
        {
          ingredient: "mixed ingredients",
          baseFraction: "1.9",
          multiplier: 1.5,
          target: "2 7/8",
          question:
            "A complex cake recipe requires the following ingredients: 1/2 cup of cocoa powder, 2/3 cup of flour, and 3/4 cup of sugar. If you want to make 1 1/2 times the recipe, how much of each ingredient will you need in total?",
        },
        {
          ingredient: "butter",
          baseFraction: "2",
          multiplier: 1,
          target: "2",
          question:
            "A baker is preparing a large order that includes 3 different types of pastries. The first requires 2/5 cup of butter, the second requires 3/4 cup, and the third requires 5/6 cup. What is the total amount of butter needed for all three pastries?",
        },
      ],
    },
  };

  // XP values for each level
  const levelXpValues = {
    easy: 50,
    medium: 100,
    hard: 200,
    expert: 300,
  };

  // Get current recipe based on level and question number
  const getCurrentRecipe = () => {
    const levelRecipes = difficultyLevels[level].recipes;
    const recipeIndex = (questionNumber - 1) % levelRecipes.length;
    return levelRecipes[recipeIndex];
  };

  // Get available cups based on current level
  const getAvailableCups = () => {
    return difficultyLevels[level].fractionCups;
  };

  // Current recipe
  const recipe = getCurrentRecipe();

  // Available fraction cups
  const availableCups = getAvailableCups();

  // Calculate target value as a decimal
  const getTargetValue = () => {
    const targetParts = recipe.target.split(" ");
    let targetValue = 0;

    // Handle whole number part if exists
    if (targetParts.length > 1) {
      targetValue += parseInt(targetParts[0]);
      const fractionParts = targetParts[1].split("/");
      targetValue += parseInt(fractionParts[0]) / parseInt(fractionParts[1]);
    } else {
      // Only fraction
      const fractionParts = targetParts[0].split("/");
      if (fractionParts.length > 1) {
        targetValue = parseInt(fractionParts[0]) / parseInt(fractionParts[1]);
      } else {
        // Only whole number
        targetValue = parseInt(targetParts[0]);
      }
    }

    return targetValue;
  };

  // Generate hint based on current recipe and selected cups
  const generateHint = () => {
    const targetValue = getTargetValue();
    const currentTotal = calculateTotal();

    if (Math.abs(currentTotal - targetValue) < 0.01) {
      return "You've got the right amount! Go ahead and submit.";
    } else if (currentTotal < targetValue) {
      return `You need to add more. You currently have ${currentTotal.toFixed(
        2
      )} cups, but you need ${targetValue.toFixed(2)} cups.`;
    } else {
      return `You've added too much. You currently have ${currentTotal.toFixed(
        2
      )} cups, but you need ${targetValue.toFixed(2)} cups.`;
    }
  };
  ///////
  // Handle level progression
  useEffect(() => {
    if (correctAnswers >= 3) {
      // Progress to next level
      const levels = ["easy", "medium", "hard", "expert"];
      const currentIndex = levels.indexOf(level);

      if (currentIndex < levels.length - 1) {
        const nextLevel = levels[currentIndex + 1];
        const xpAmount = levelXpValues[nextLevel];

        // Set up level-up celebration
        setNewLevel(nextLevel);
        setXpGained(xpAmount);

        // Reset confetti and level-up states first
        setShowConfetti(false);
        setShowLevelUp(false);

        // Force re-renders by changing keys
        setLevelUpKey((prevKey) => prevKey + 1);

        // Trigger level-up celebration with slight delay
        setTimeout(() => {
          setShowLevelUp(true);
          setPlayLevelUpSound(true);
        }, 100);

        // Hide level-up notification after celebration and automatically move to next level
        setTimeout(() => {
          setShowLevelUp(false);
          // Now update the actual level
          setLevel(nextLevel);
          setCorrectAnswers(0);
          setIncorrectAnswers(0);
          setQuestionNumber(1);
          // Reset selected cups for the new question
          setSelectedCups([]);
          setIsCorrect(null);
        }, 4000);
      } else {
        // Already at expert level, just reset counters
        setCorrectAnswers(0);
        // Move to next question automatically
        setSelectedCups([]);
        setIsCorrect(null);
        setQuestionNumber(questionNumber + 1);
      }
    }

    if (incorrectAnswers >= 3) {
      // Demote to previous level
      const levels = ["easy", "medium", "hard", "expert"];
      const currentIndex = levels.indexOf(level);

      if (currentIndex > 0) {
        const prevLevel = levels[currentIndex - 1];

        // Set up level-down notification
        setPreviousLevel(prevLevel);

        // Reset states first
        setShowLevelDown(false);

        // Force re-renders by changing keys
        setLevelDownKey((prevKey) => prevKey + 1);

        // Trigger level-down notification with slight delay
        setTimeout(() => {
          setShowLevelDown(true);
          setPlayLevelDownSound(true);
        }, 100);

        // Hide level-down notification after display and automatically move to previous level
        setTimeout(() => {
          setShowLevelDown(false);
          // Now update the actual level
          setLevel(prevLevel);
          setCorrectAnswers(0);
          setIncorrectAnswers(0);
          setQuestionNumber(1);
          // Reset selected cups for the new question
          setSelectedCups([]);
          setIsCorrect(null);
        }, 4000);
      } else {
        // Already at easy level, just reset counters
        setIncorrectAnswers(0);
        // Reset current question
        setSelectedCups([]);
        setIsCorrect(null);
      }
    }
  }, [correctAnswers, incorrectAnswers, level, questionNumber]);

  // Show hint after 2 incorrect answers
  useEffect(() => {
    if (incorrectAnswers >= 2 && incorrectAnswers < 3) {
      setShowHint(true);
    } else {
      setShowHint(false);
    }
  }, [incorrectAnswers]);

  // Reset sound effect state after playing
  useEffect(() => {
    if (playSuccessSound) {
      const timer = setTimeout(() => {
        setPlaySuccessSound(false);
      }, 1000); // Reset after 1 second

      return () => clearTimeout(timer);
    }
  }, [playSuccessSound]);

  // Reset level-up sound effect state after playing
  useEffect(() => {
    if (playLevelUpSound) {
      const timer = setTimeout(() => {
        setPlayLevelUpSound(false);
      }, 2000); // Reset after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [playLevelUpSound]);

  // Reset level-down sound effect state after playing
  useEffect(() => {
    if (playLevelDownSound) {
      const timer = setTimeout(() => {
        setPlayLevelDownSound(false);
      }, 2000); // Reset after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [playLevelDownSound]);

  // Handle cup drag start
  const handleCupDragStart = (fraction, value) => {
    setDraggedCup({ fraction, value });
  };

  // Handle drop on mixing bowl
  const handleBowlDrop = (cup) => {
    if (cup && cup.fraction && cup.value) {
      setSelectedCups([...selectedCups, cup]);
    }
  };

  // Calculate total of selected cups
  const calculateTotal = () => {
    return selectedCups.reduce((total, cup) => total + cup.value, 0);
  };

  // Handle submit
  const handleSubmit = () => {
    const total = calculateTotal();
    const targetValue = getTargetValue();
    const isAnswerCorrect = Math.abs(total - targetValue) < 0.01;

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      // Reset confetti state first to ensure it can be triggered again
      setShowConfetti(false);
      // Force a re-render by changing the key
      setConfettiKey((prevKey) => prevKey + 1);
      // Use setTimeout to ensure state update has completed
      setTimeout(() => {
        setShowConfetti(true);
        setPlaySuccessSound(true);
      }, 50);

      // Hide confetti after animation completes
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };

  // Reset and move to next question
  const handleNextQuestion = () => {
    setSelectedCups([]);
    setIsCorrect(null);
    setQuestionNumber(questionNumber + 1);
    // Explicitly reset confetti state when moving to next question
    setShowConfetti(false);
  };

  // Reset current question
  const resetSelection = () => {
    setSelectedCups([]);
    setIsCorrect(null);
    // Explicitly reset confetti state when resetting the question
    setShowConfetti(false);
  };

  return (
    <div className="baking-fractions-container">
      <div className="kitchen-background">
        <div className="kitchen-wall"></div>
        <div className="kitchen-tiles"></div>
      </div>

      {/* Confetti overlay with key to force re-render */}
      <Confetti key={confettiKey} active={showConfetti} />

      {/* Level-up notification with key to force re-render */}
      <LevelUpNotification
        key={levelUpKey}
        level={newLevel}
        xpGained={xpGained}
        active={showLevelUp}
      />

      {/* Level-down notification with key to force re-render */}
      <LevelDownNotification
        key={levelDownKey}
        level={previousLevel}
        active={showLevelDown}
      />

      {/* Sound effects */}
      <SoundEffect play={playSuccessSound} soundUrl={successSound} />
      <SoundEffect play={playLevelUpSound} soundUrl={levelUpSound} />
      <SoundEffect play={playLevelDownSound} soundUrl={levelDownSound} />

      


      <header className="baking-header">
        <h1>
          BAKING FRACTION<span className="cupcake-icon">🧁</span>
        </h1>
        <LevelBadge level={level} />
      </header>

      <div className="recipe-instruction">
        <p>
          <strong>Problem: </strong>
          {recipe.question}
        </p>
      </div>

      <div className="game-content">
        <div className="fraction-cups">
          {availableCups.map((cup) => (
            <FractionCup
              key={cup.id}
              fraction={cup.fraction}
              value={cup.value}
              ingredient={cup.id === 3 ? recipe.ingredient : ""}
              onDragStart={handleCupDragStart}
            />
          ))}
          <div className="ingredient-label">{recipe.ingredient}</div>
        </div>

        <div className="mixing-area">
          <MixingBowl selectedCups={selectedCups} onDrop={handleBowlDrop} />
          <div className="bowl-instructions">Drag cups here</div>
        </div>

        <div className="target-area">
          <MeasuringCup initialFillPercentage={40} />
          <div className="target-label">
            <p>
              <strong>Target: ?</strong>
            </p>
            {/* <p className="target-fraction">{recipe.target} Cup</p> */}
          </div>
        </div>
      </div>

      {showHint && (
        <div className="hint-message">
          <p>
            <span className="hint-label">Hint:</span> {generateHint()}
          </p>
        </div>
      )}

      <button
        className="submit-button-bake"
        onClick={handleSubmit}
        disabled={isCorrect !== null}
      >
        Submit Mix
      </button>

      {isCorrect !== null && (
        <div
          className={`feedback-message ${isCorrect ? "correct" : "incorrect"}`}
        >
          {isCorrect
            ? "Great job! You've added the correct amount!"
            : "Not quite right. Try again!"}
          <button onClick={isCorrect ? handleNextQuestion : resetSelection}>
            {isCorrect ? "Next Question" : "Try Again"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BakingFractions;
