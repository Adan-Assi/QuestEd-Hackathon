import React, { useState, useEffect, useRef } from 'react';
import './TeacherDashboard.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TeacherDashboard = () => {
  const [lesson, setLesson] = useState('');
  const [filter, setFilter] = useState('All');
  const [insights, setInsights] = useState('');
  const [quizPreview, setQuizPreview] = useState('');
  const [feedIndex, setFeedIndex] = useState(0);
  const [message, setMessage] = useState('');
  const pdfRef = useRef();

  // Fake class feed
  const feedItems = [
    'Sara completed "Relativity Quiz"',
    'Adam missed "Gravity Challenge"',
    'Laila unlocked "Daily Streak" badge',
    'Omar completed 3 games in a row',
    'Noah hasn’t logged in for 3 days'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedIndex((prev) => (prev + 1) % feedItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulated real-time lesson insights
  useEffect(() => {
    if (!lesson) {
      setInsights('');
      setQuizPreview('');
      return;
    }
    const wordCount = lesson.trim().split(/\s+/).length;
    const difficulty = wordCount < 30 ? 'Easy' : wordCount < 60 ? 'Medium' : 'Hard';
    const keywords = lesson.match(/\b(gravity|energy|force|photosynthesis|atom|newton|speed|acceleration)\b/gi) || [];

    setInsights(`🧠 AI Analysis:
- Estimated Difficulty: ${difficulty}
- Keywords: ${keywords.join(', ') || 'None'}
- Game Mode Suggestion: ${keywords.includes('force') ? 'Puzzle' : 'Story Mode'}`);

    setQuizPreview(`🧪 Quiz Preview:
1. What is one key idea from this lesson?
  - A. [Fake Option]
  - B. [Relevant Concept]
  - C. All of the above`);
  }, [lesson]);

  const studentStats = [
    { name: 'Sara', completed: 4, missed: 0, highlight: 'Top Performer', loginDays: 5, avgTime: 14 },
    { name: 'Adam', completed: 2, missed: 2, highlight: 'Needs Attention', loginDays: 2, avgTime: 9 },
    { name: 'Laila', completed: 5, missed: 0, highlight: 'Story Mode Star', loginDays: 6, avgTime: 16 },
    { name: 'Omar', completed: 3, missed: 1, highlight: 'Consistent', loginDays: 4, avgTime: 11 },
    { name: 'Noah', completed: 1, missed: 4, highlight: 'Low Engagement', loginDays: 1, avgTime: 5 },
    { name: 'Maya', completed: 3, missed: 0, highlight: 'New Joiner', loginDays: 3, avgTime: 12 }
  ];

  const gameTypeStats = [
    { name: 'Story Mode', value: 45 },
    { name: 'Quiz Mode', value: 25 },
    { name: 'Puzzle Mode', value: 15 },
    { name: 'Challenge Mode', value: 15 }
  ];

  const COLORS = ['#3b82f6', '#f97316', '#10b981', '#f43f5e'];

  const filteredStats =
    filter === 'All'
      ? studentStats
      : studentStats.filter((s) => s.name.toLowerCase() === filter.toLowerCase());

  const exportPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('teacher_dashboard.pdf');
    });
  };

  const handleMessageSend = () => {
    alert(`Motivational message sent to low-engagement students:\n"${message}"`);
    setMessage('');
  };

  const getBadges = (student) => {
    const badges = [];
    if (student.completed >= 5) badges.push('🏅 Brainiac');
    if (student.loginDays >= 5) badges.push('🔥 Daily Streak');
    if (student.avgTime >= 15) badges.push('⏱️ Focused Learner');
    if (student.name === 'Laila') badges.push('🌟 Best Helper');
    return badges;
  };

  return (
    <div className="teacher-dashboard" ref={pdfRef}>
      <h2>👩‍🏫 Teacher Dashboard</h2>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Upload Lesson</label>
        <textarea
          value={lesson}
          onChange={(e) => setLesson(e.target.value)}
          placeholder="Type your lesson here..."
          rows="5"
        />
        <button onClick={() => alert(`Game created for: ${lesson}`)}>Generate Game</button>
      </form>

      {insights && <pre className="insights">{insights}</pre>}
      {quizPreview && <pre className="quiz-preview">{quizPreview}</pre>}

      <div className="activity-feed">
        <h3>🧭 Class Activity Feed</h3>
        <p>{feedItems[feedIndex]}</p>
      </div>

      <div className="class-overview">
        <h3>📊 Class Overview</h3>
        <label>Filter by student:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          {studentStats.map((s, i) => (
            <option key={i} value={s.name}>{s.name}</option>
          ))}
        </select>
        <ul>
          {filteredStats.map((s, i) => (
            <li key={i}>
              🧑‍🎓 <strong>{s.name}</strong> — Games: <strong>{s.completed}</strong> | Missed: <strong>{s.missed}</strong> | Avg. Time: {s.avgTime} mins  
              <br />Badges: {getBadges(s).join(', ') || 'None'}
            </li>
          ))}
        </ul>
      </div>

      <div className="analytics">
        <h3>📈 Weekly Performance Summary</h3>
        <ul>
          <li>📅 Average Games per Student: <strong>3.0</strong></li>
          <li>🔥 Top Game Mode: <strong>Story Mode</strong></li>
          <li>🎯 Most Missed Topic: <strong>Fractions</strong></li>
          <li>⭐ Engagement Rate: <strong>76%</strong></li>
          <li>🚀 Most Improved Student: <strong>Laila</strong></li>
        </ul>
      </div>

      <div className="chart-area">
        <h3>📊 Game Completions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studentStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="leaderboard">
        <h3>🏆 Leaderboard</h3>
        <ol>
          {[...studentStats].sort((a, b) => b.completed - a.completed).map((s, i) => (
            <li key={i}><strong>{s.name}</strong>: {s.completed} games</li>
          ))}
        </ol>
      </div>

      <div className="trend-charts">
        <h3>📉 Game Type Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={studentStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="missed" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={gameTypeStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {gameTypeStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="heatmap">
        <h3>🌡️ Login Activity Heatmap</h3>
        <ul>
          {studentStats.map((s, i) => (
            <li key={i}>{s.name}: <span style={{ display: 'inline-block', background: '#3b82f6', width: `${s.loginDays * 15}px`, height: '10px' }} /></li>
          ))}
        </ul>
      </div>

      <div className="motivation-box">
        <h3>📬 Motivate Students</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a motivational message to low-engagement students..."
        />
        <button onClick={handleMessageSend}>Send Message</button>
      </div>

      <button onClick={exportPDF} style={{ marginTop: '20px' }}>📤 Export Dashboard to PDF</button>
    </div>
  );
};

export default TeacherDashboard;
