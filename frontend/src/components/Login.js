import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Name@4321') {
      onLogin({ username, role: username.includes('Store') ? 'storePerson' : 'employee' });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <select value={username} onChange={(e) => setUsername(e.target.value)}>
          <option value="Employee1">Employee1</option>
          <option value="Employee2">Employee2</option>
          <option value="StorePerson1">StorePerson1</option>
        </select>
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
