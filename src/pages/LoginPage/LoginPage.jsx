import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Please enter both fields.');
    role === 'student' ? history.push('/student') : history.push('/teacher');
  };

  const handleGuestLogin = () => history.push('/student');

  return (
    <div className="login__page">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="user__input">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        </div>
        <div className="user__input">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        <div className="role__select">
          <label><input type="radio" name="role" value="student" checked={role === 'student'} onChange={() => setRole('student')} /> I'm a Student</label>
          <label><input type="radio" name="role" value="teacher" checked={role === 'teacher'} onChange={() => setRole('teacher')} /> I'm a Teacher</label>
        </div>
        <div className="login__button"><button type="submit">Login</button></div>
        <div className="guest__button"><button type="button" onClick={handleGuestLogin}>Continue as Guest</button></div>
      </form>
    </div>
  );
}

export default LoginPage;