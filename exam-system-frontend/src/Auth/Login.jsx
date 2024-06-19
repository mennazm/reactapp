import React, { useState } from 'react';
import { loginUser } from '../Api/ExamApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const { token, userId } = await loginUser(userData);
      localStorage.setItem('token', token);
      console.log(token); // Store token in localStorage for future requests
      // Redirect or do something with userId, e.g., set global state
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
