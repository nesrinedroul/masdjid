import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const backendUrl = 'https://mohannednes.pythonanywhere.com/auth/login';

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(backendUrl, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
  
      const data = response.data;
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token); // Store the token
        console.log('Token Stored:', data.access_token); // Debug log
        onLogin(data); // Pass the user data to the parent
        navigate('/app'); // Redirect to the app
      } else {
        setError('Login failed: No access token received');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed');
      } else if (error.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };
  
  return (
    <div className="form-container sign-in">
      <form onSubmit={handleLogin}>
        <h1>Sign In</h1>
        <span>Use your email and password</span>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
