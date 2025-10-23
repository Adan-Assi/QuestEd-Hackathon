import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Sidebar.css';
import {
  RiHome3Fill,
  RiGamepadFill,
  RiBook2Fill,
  RiUserSmileFill,
  RiGiftFill,
  RiBarChart2Fill,
  RiTeamFill,
  RiTimeFill
} from 'react-icons/ri';

import { GiTeacher } from 'react-icons/gi';


const Sidebar = () => {
  const history = useHistory();
  const [isExpanded, setIsExpanded] = useState(true);

const navItems = [
  { label: 'Dashboard', path: '/student', icon: <RiHome3Fill size={22} style={{ color: '#3B82F6' }} /> },       // Blue
  { label: 'Play Game', path: '/game', icon: <RiGamepadFill size={22} style={{ color: '#22C55E' }} /> },       // Green
  { label: 'Story Mode', path: '/story', icon: <RiBook2Fill size={22} style={{ color: '#F59E0B' }} /> },       // Amber
  { label: 'Avatar', path: '/avatar', icon: <RiUserSmileFill size={22} style={{ color: '#EC4899' }} /> },      // Pink
  { label: 'Mystery Box', path: '/mystery', icon: <RiGiftFill size={22} style={{ color: '#A855F7' }} /> },     // Purple
  { label: 'Be the Teacher', path: '/teachmode', icon: <GiTeacher size={22} style={{ color: '#F43F5E' }} /> }, // Rose
  { label: 'My Analytics', path: '/analytics', icon: <RiBarChart2Fill size={22} style={{ color: '#F97316' }} /> }, // Orange
  { label: 'Group Game', path: '/group-game', icon: <RiTeamFill size={22} style={{ color: '#10B981' }} /> },   // Emerald
  { label: 'Time Machine', path: '/time-machine', icon: <RiTimeFill size={22} style={{ color: '#38BDF8' }} /> }, // Sky blue
];

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '←' : '→'}
      </button>

      <h2 className="sidebar-logo">{isExpanded ? '🎮 LearnQuest' : '🎮'}</h2>

      <div className="nav-scroll-container">
        <ul className="sidebar-nav">
          {navItems.map((item, index) => (
            <li key={index} onClick={() => history.push(item.path)}>
              <span className="icon">{item.icon}</span>
              {isExpanded && <span className="label">{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>

      <button className="sidebar-logout" onClick={() => history.push('/')}>
        <span className="icon">🚪</span>
        {isExpanded && <span className="label">Log Out</span>}
      </button>
    </div>
  );
};

export default Sidebar;
