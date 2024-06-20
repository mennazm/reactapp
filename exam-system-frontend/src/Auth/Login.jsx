import React, { useState } from 'react';
import { loginUser } from '../Api/ExamApi';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const { token, userId } = await loginUser(userData);
      localStorage.setItem('token', token);
      console.log(token); 
      navigate('/questions');

    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-illustration">
        <img src="images/login.svg" alt="Login Illustration" />
      </div>
      <div className="login-form-container">
          <form onSubmit={handleLogin} className="login-form">
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
    </div>
    </div>
  );
};

export default Login;
