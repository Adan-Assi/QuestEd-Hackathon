import React, { useState } from 'react';
import './GroupGameLobby.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import p0 from '../../pictures/player0.jpeg';
import p1 from '../../pictures/player1.jpeg';
import p2 from '../../pictures/player2.jpeg';
import p3 from '../../pictures/player3.jpeg';
import p4 from '../../pictures/player4.jpeg';
import Unknown from '../../pictures/player5.jpeg';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';


const saveGamesToStorage = (games) => {
  const serialized = games.map(game => {
    const qStr = game.questions.map(q =>
      `${q.question}~${q.options.join(';')}~${q.answer}`
    ).join('~~'); // Separate questions with double-tilde
    return `${game.title}|${qStr}`;
  }).join('|||'); // Separate games
  localStorage.setItem('customGamesRaw', serialized);
};

const loadGamesFromStorage = () => {
  const raw = localStorage.getItem('customGamesRaw');
  if (!raw) return [];
  return raw.split('|||').map(gameStr => {
    const [title, ...qParts] = gameStr.split('|');
    const questions = qParts.join('|').split('~~').map(qStr => {
      const [question, optStr, answerStr] = qStr.split('~');
      return {
        question: question,
        options: optStr.split(';'),
        answer: parseInt(answerStr)
      };
    });
    return { title, questions };
  });
};

const initialAvailableGames = ['Space Explorer Quest', 'Invention Quest', 'animal Facts', 'Create New Game'];


// 🎯 Randomized fake answer generator
const generateAnswerStats = (questionObj) => {
  const stats = {};
  const options = questionObj.options;
  const totalFakeAnswers = 6;

  for (let i = 0; i < totalFakeAnswers; i++) {
    const randomIndex = Math.floor(Math.random() * options.length);
    const selected = options[randomIndex];
    stats[selected] = (stats[selected] || 0) + 1;
  }

  return Object.entries(stats).map(([option, count]) => ({ option, count }));
};

// 🧠 Player score tracker
const getInitialScores = (players) => {
  const scores = {};
  players.forEach(name => { scores[name] = 0 });
  return scores;
};

// 🧪 Invention Quiz
const inventionQuestions = [
  {
    question: 'Who is credited with inventing the first practical light bulb?',
    options: ['Nikola Tesla', 'Michael Faraday', 'Thomas Edison', 'Alexander Graham Bell'],
    answer: 2
  },
  {
    question: 'Who invented the telescope?',
    options: ['Galileo Galilei', 'Johannes Kepler', 'Hans Lippershey', 'Isaac Newton'],
    answer: 2
  },
  {
    question: 'What was the first device to capture a permanent photograph?',
    options: ['Polaroid Camera', 'Kodak Brownie', 'Camera Obscura', 'Daguerreotype'],
    answer: 3
  }
];

// 🚀 Space Quiz
const spaceQuestions = [
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 1
  },
  {
    question: 'What is the name of our galaxy?',
    options: ['Andromeda', 'Whirlpool', 'Milky Way', 'Sombrero'],
    answer: 2
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Saturn', 'Jupiter', 'Uranus'],
    answer: 2
  },
  {
    question: 'Which planet has the most moons?',
    options: ['Saturn', 'Jupiter', 'Neptune', 'Mars'],
    answer: 0
  },
  {
    question: 'Who was the first person to walk on the Moon?',
    options: ['Yuri Gagarin', 'Buzz Aldrin', 'Neil Armstrong', 'Michael Collins'],
    answer: 2
  },
  {
    question: 'Which celestial body is responsible for ocean tides on Earth?',
    options: ['The Sun', 'The Moon', 'Mars', 'Earth’s rotation'],
    answer: 1
  },
  {
    question: 'What is a supernova?',
    options: ['A type of black hole', 'A star that exploded', 'A new galaxy', 'An asteroid impact'],
    answer: 1
  },
  {
    question: 'Which planet is closest to the Sun?',
    options: ['Mercury', 'Venus', 'Earth', 'Mars'],
    answer: 0
  },
  {
    question: 'What protects Earth from harmful solar radiation?',
    options: ['Ozone Layer', 'Greenhouse gases', 'Magnetic field', 'Clouds'],
    answer: 2
  },
  {
    question: 'Which rover landed on Mars in 2021?',
    options: ['Curiosity', 'Spirit', 'Opportunity', 'Perseverance'],
    answer: 3
  }
];

// 🐾 Animal Facts Quiz
const animalFactQuestions = [
  {
    question: 'What is the fastest land animal?',
    options: ['Cheetah', 'Lion', 'Greyhound', 'Kangaroo'],
    answer: 0
  },
  {
    question: 'Which animal can sleep standing up?',
    options: ['Tiger', 'Horse', 'Bear', 'Gorilla'],
    answer: 1
  },
  {
    question: 'Which mammal lays eggs?',
    options: ['Kangaroo', 'Dolphin', 'Platypus', 'Elephant'],
    answer: 2
  },
  {
    question: 'What’s the only mammal capable of true flight?',
    options: ['Flying Squirrel', 'Bat', 'Owl', 'Pigeon'],
    answer: 1
  },
  {
    question: 'How many hearts does an octopus have?',
    options: ['1', '2', '3', '4'],
    answer: 2
  },
  {
    question: 'Which animal is known to have the best memory?',
    options: ['Dolphin', 'Chimpanzee', 'Elephant', 'Dog'],
    answer: 2
  },
  {
    question: 'What color is a polar bear’s skin?',
    options: ['White', 'Pink', 'Black', 'Gray'],
    answer: 2
  },
  {
    question: 'What is the largest species of shark?',
    options: ['Great White', 'Hammerhead', 'Whale Shark', 'Tiger Shark'],
    answer: 2
  },
  {
    question: 'Which bird is known for mimicking human speech?',
    options: ['Crow', 'Parrot', 'Eagle', 'Owl'],
    answer: 1
  },
  {
    question: 'Which sea creature has three hearts?',
    options: ['Starfish', 'Jellyfish', 'Octopus', 'Sea Urchin'],
    answer: 2
  }
];

export {
  inventionQuestions,
  spaceQuestions,
  animalFactQuestions,
  getInitialScores,
  generateAnswerStats
};

const GroupGameLobby = () => {
  const [selectedGame, setSelectedGame] = useState('');
  const [inviteCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [friends, setFriends] = useState(['You']);
  const [copied, setCopied] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [showVsScreen, setShowVsScreen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [playerScores, setPlayerScores] = useState(getInitialScores(['You', 'Laila', 'Adam', 'Sara', 'Omar']));
  const [allPlayerAnswers, setAllPlayerAnswers] = useState([]);
  //const [availableGames, setAvailableGames] = useState([...initialAvailableGames, ...loadGamesFromStorage()]);
  
  const customGames = loadGamesFromStorage();
  const [availableGames, setAvailableGames] = useState([...initialAvailableGames, ...customGames.map(g => g.title)]);

  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGameQuestions, setNewGameQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: 0 }]);

  const avatarMap = {
    You: p0,
    Laila: p1,
    Adam: p2,
    Sara: p3,
    Omar: p4
  };

  const getCurrentQuestions = () => {
    switch (selectedGame) {
      case 'Invention Quest':
        return inventionQuestions;
      case 'Space Explorer Quest':
        return spaceQuestions;
      case 'animal Facts':
        return animalFactQuestions;
      default:
        // Check if it's a custom game
        const customGame = loadGamesFromStorage().find(game => game.title === selectedGame);
        return customGame ? customGame.questions : [];

    }
  };

  const currentQuestions = getCurrentQuestions();

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = () => {
    if (friendName.trim()) {
      setFriends([...friends, friendName]);
      setShowInviteModal(false);
      setFriendName('');
      setInvitationSent(true);
      setTimeout(() => setInvitationSent(false), 2000);
    }
  };

  const simulateLiveJoin = () => {
    const fakeNames = ['Laila', 'Adam', 'Sara', 'Omar'];
    const currentNames = new Set(friends);
    const namesToAdd = fakeNames.filter(name => !currentNames.has(name));

    let index = 0;
    const interval = setInterval(() => {
      if (index < namesToAdd.length) {
        setFriends(prev => [...prev, namesToAdd[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
  };

  const startGame = () => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(interval);
        setCountdown(0);
        setShowVsScreen(true);
        setTimeout(() => {
          setShowVsScreen(false);
          setShowQuiz(true);
        }, 3000);
        return 0;
      });
    }, 1000);
  };

  const handleAnswer = (index) => {
    if (answered) return;

    const currentQuestion = currentQuestions[quizIndex];
    const correct = index === currentQuestion.answer;

    if (correct) {
      setScore(score + 1);
      setPlayerScores(prev => ({ ...prev, You: prev.You + 1 }));
    } else {
      setWrongAnswers(prev => [...prev, {
        question: currentQuestion.question,
        correctAnswer: currentQuestion.options[currentQuestion.answer],
        selectedAnswer: currentQuestion.options[index]
      }]);
    }

    const newAnswers = [{ name: 'You', answer: currentQuestion.options[index] }];
    const correctAnswerIndex = currentQuestion.answer;
    const options = currentQuestion.options;

    friends.forEach((friend) => {
      if (friend === 'You') return;
      const rand = Math.floor(Math.random() * options.length);
      newAnswers.push({ name: friend, answer: options[rand] });
      if (rand === correctAnswerIndex) {
        setPlayerScores(prev => ({ ...prev, [friend]: (prev[friend] || 0) + 1 }));
      }
    });

    setAllPlayerAnswers(prev => [...prev, { question: currentQuestion.question, answers: newAnswers }]);
    setAnswered(true);

    setTimeout(() => {
      if (quizIndex + 1 < currentQuestions.length) {
        setQuizIndex(quizIndex + 1);
        setAnswered(false);
      } else {
        setShowResult(true);
        setShowQuiz(false);
      }
    }, 5000);
  };

  const handleGameSelect = (e) => {
    const game = e.target.value;
    if (game === 'Create New Game') {
      setShowCreateGameModal(true);
      setSelectedGame('');
    } else {
      setSelectedGame(game);
    }
  };

  const addNewQuestion = () => {
    setNewGameQuestions([...newGameQuestions, { question: '', options: ['', '', '', ''], answer: 0 }]);
  };

  const removeQuestion = (index) => {
    if (newGameQuestions.length > 1) {
      const updatedQuestions = [...newGameQuestions];
      updatedQuestions.splice(index, 1);
      setNewGameQuestions(updatedQuestions);
    }
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...newGameQuestions];
    if (field === 'options') {
      const [optIndex, optValue] = value;
      updatedQuestions[index].options[optIndex] = optValue;
    } else {
      updatedQuestions[index][field] = value;
    }
    setNewGameQuestions(updatedQuestions);
  };

  const saveNewGame = () => {
    if (!newGameTitle.trim()) {
      alert('Please enter a game title');
      return;
    }

    // Validate all questions
    for (const q of newGameQuestions) {
      if (!q.question.trim()) {
        alert('All questions must have text');
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        alert('All options must be filled in');
        return;
      }
    }

    const newGame = {
      title: newGameTitle,
      questions: newGameQuestions
    };

    // Save to localStorage
    const existingGames = loadGamesFromStorage();
    const updatedGames = [...existingGames, newGame];
    saveGamesToStorage(updatedGames);
    setAvailableGames([...initialAvailableGames, ...updatedGames.map(g => g.title)]);

    setSelectedGame(newGameTitle);
    setShowCreateGameModal(false);
    setNewGameTitle('');
    setNewGameQuestions([{ question: '', options: ['', '', '', ''], answer: 0 }]);
  };

  return (
    <div className="group-lobby-container">
      <Sidebar />
      <div className="group-game-lobby">
        <h2>👥 Group Game Lobby</h2>

        <div className="form-section">
          <label>Select a game:</label>
          <select onChange={handleGameSelect} value={selectedGame}>
            <option value="">-- Choose a game --</option>
            {availableGames.map((game, i) => (
              <option key={i} value={game}>{game}</option>
            ))}
          </select>
        </div>

        {selectedGame && !showQuiz && !showResult && (
          <div className="lobby-section">
            <h3>🎮 {selectedGame}</h3>
            <div className="invite-code">
              <strong>Invite Code:</strong> <span>{inviteCode}</span>
              <button onClick={handleCopy}>{copied ? '✅ Copied!' : 'Copy Code'}</button>
            </div>
            <div className="players-list">
              <h4>👤 Players Joined:</h4>
              <ul>
                {friends.map((friend, i) => {
                  const safeName = friend || 'Unknown';
                  const avatarSrc = avatarMap[safeName] || Unknown;
                  return (
                    <li key={i}>
                      <img className="player-avatar" src={avatarSrc} alt={safeName} />
                      {safeName}
                    </li>
                  );
                })}
              </ul>
              {friends.length < 5 && (
                <>
                  <button onClick={() => setShowInviteModal(true)}>+ Invite Friend</button>
                  <button onClick={simulateLiveJoin}>+ Simulate Friends Joining</button>
                </>
              )}
            </div>
            {friends.length > 1 && countdown === 0 && !showVsScreen && (
              <button className="start-button" onClick={startGame}>🚀 Start Game</button>
            )}
            {countdown > 0 && (
              <div className="countdown-bubble">
                ⏱️ Game starting in {countdown}...
              </div>
            )}
          </div>
        )}

     {showQuiz && !showResult && (
          <div className="lobby-section">
            <h3>🧠 {selectedGame} Quiz</h3>
            <p>{currentQuestions[quizIndex].question}</p>
            <ul>
              {currentQuestions[quizIndex].options.map((option, i) => {
                const isCorrect = i === currentQuestions[quizIndex].answer;
                const isSelectedWrong = answered && wrongAnswers.some(w =>
                  w.question === currentQuestions[quizIndex].question &&
                  w.selectedAnswer === option
                );
                return (
                  <li key={i}>
                    <button
                      onClick={() => handleAnswer(i)}
                      className={
                        isSelectedWrong
                          ? 'wrong-answer'
                          : isCorrect && answered
                          ? 'correct-answer'
                          : ''
                      }
                    >
                      {option}
                    </button>
                  </li>
                );
              })}
            </ul>
                {answered && (
                <div style={{ height: 300, marginTop: '2rem' }}>
                  <h4>📊 What others answered:</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={generateAnswerStats(currentQuestions[quizIndex], currentQuestions[quizIndex].answer)}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="option" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
          </div>
        )}

        {showResult && (
          <div className="lobby-section">
            <h3>🏁 Quiz Complete!</h3>
            <p>Your score: {score} / {currentQuestions.length}</p>

            <h4>🏆 Final Scores:</h4>
            <ul>
              {Object.entries(playerScores).map(([name, val]) => (
                <li key={name}><strong>{name}:</strong> {val}</li>
              ))}
            </ul>

            {(() => {
              const max = Math.max(...Object.values(playerScores));
              const winners = Object.entries(playerScores).filter(([_, val]) => val === max).map(([name]) => name);
              return (
                <p><strong>🥇 Winner{winners.length > 1 ? 's' : ''}:</strong> {winners.join(', ')}</p>
              );
            })()}

            <button onClick={() => {
              setQuizIndex(0);
              setScore(0);
              setWrongAnswers([]);
              setShowResult(false);
              setSelectedGame('');
              setPlayerScores(getInitialScores(friends));
            }}>
              Play Again
            </button>
          </div>
        )}

      

        {showCreateGameModal && (
          <div className="modal-backdrop">
            <div className="create-game-modal">
              <h3>Create New Game</h3>
              <div className="form-group">
                <label>Game Title:</label>
                <input
                  type="text"
                  value={newGameTitle}
                  onChange={(e) => setNewGameTitle(e.target.value)}
                  placeholder="Enter game title"
                />
              </div>

              <h4>Questions:</h4>
              {newGameQuestions.map((q, qIndex) => (
                <div key={qIndex} className="question-group">
                  <div className="form-group">
                    <label>Question {qIndex + 1}:</label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      placeholder="Enter question"
                    />
                  </div>

                  <div className="options-group">
                    <label>Options:</label>
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="option-item">
                        <input
                          type="radio"
                          name={`correct-answer-${qIndex}`}  // ✅ ensures radio groups are distinct
                          checked={q.answer === optIndex}
                          onChange={() => updateQuestion(qIndex, 'answer', optIndex)}
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateQuestion(qIndex, 'options', [optIndex, e.target.value])}
                          placeholder={`Option ${optIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>

                  {newGameQuestions.length > 1 && (
                    <button
                      className="remove-question"
                      onClick={() => removeQuestion(qIndex)}
                    >
                      🗑️ Remove Question
                    </button>
                  )}
                </div>
              ))}


              <div className="modal-buttons">
                <button onClick={addNewQuestion}>Add Question</button>
                <button onClick={saveNewGame}>Save Game</button>
                <button onClick={() => setShowCreateGameModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
 {showInviteModal && (
        <div className="modal-backdrop">
          <div className="invite-modal">
            <h3>Invite a Friend</h3>
            <input
              type="text"
              placeholder="Friend's Username"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleSendInvite}>Send Invite</button>
              <button onClick={() => setShowInviteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {invitationSent && (
        <div className="popup-toast">
          ✅ Invitation sent to your friend!
        </div>
      )}

      {showVsScreen && (
        <div className="vs-screen">
          <div className="vs-left">
            <img src="/avatars/you.png" alt="You" />
            <h3>You</h3>
          </div>
          <div className="vs-label">VS</div>
          <div className="vs-right">
            <img src="/avatars/ai_boss.png" alt="AI" />
            <h3>AI-Bot</h3>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default GroupGameLobby;