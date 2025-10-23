import React from 'react';
import './StudentAnalytics.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer
} from 'recharts';

const StudentAnalytics = () => {
  const gamesCompleted = 12;
  const avgTime = '7m 45s';
  const streak = 5;
  const xp = 340;
  const levelXP = 500;
  const badges = ['📘 Consistent', '🚀 Fast Learner', '🎯 Daily Champ'];

  const xpProgress = (xp / levelXP) * 100;

  const modeData = [
    { name: 'Story', value: 45 },
    { name: 'Quiz', value: 30 },
    { name: 'Puzzle', value: 15 },
    { name: 'Challenge', value: 10 }
  ];

  const trendData = [
    { day: 'Mon', time: 5 },
    { day: 'Tue', time: 6.2 },
    { day: 'Wed', time: 7.1 },
    { day: 'Thu', time: 8.2 },
    { day: 'Fri', time: 7.9 },
    { day: 'Sat', time: 9.3 },
    { day: 'Sun', time: 6.7 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="analytics-container">
      <Sidebar />
      <div className="analytics-content">
       <div className="analytics-header">
  <h2>📊 My Learning Analytics</h2>
</div>


        <div className="stat-cards">
          <div className="card">🎮 Games Completed: {gamesCompleted}</div>
          <div className="card">⏱️ Avg. Session Time: {avgTime}</div>
          <div className="card">🔥 Current Streak: {streak} days</div>
          <div className="card">⭐ XP Progress: {xp}/{levelXP}</div>
        </div>

        <div className="xp-barr">
          <div className="fill" style={{ width: `${xpProgress}%` }} />
        </div>

        <h3>🏆 Unlocked Badges</h3>
        <div className="badges">
          {badges.map((b, i) => (
            <span className="badge" key={i}>{b}</span>
          ))}
        </div>

        <div className="charts-grid">
          <div className="chart-box">
            <h4>🎯 Game Modes Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={modeData}
                  outerRadius={80}
                  label
                >
                  {modeData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>


        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
