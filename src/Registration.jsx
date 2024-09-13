import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // Assuming this has your styles
import { useNavigate } from 'react-router-dom';
const Registration = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hosted backend URL
  const backendUrl = 'https://mohannednes.pythonanywhere.com/auth/register';

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        const response = await axios.post(backendUrl, {
          name,
          email,
          password
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true // Include credentials (if needed)
        });

        // Handle response
        const data = response.data;
        localStorage.setItem('token', data.token); // Store token
        onRegister(data); // Handle registration
        navigate('/app'); // Redirect on successful registration

      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          setError(error.response.data.message || 'Registration failed');
        } else if (error.request) {
          // Request was made but no response received
          setError('No response from server. Please try again.');
        } else {
          // Something else happened
          setError('An error occurred. Please try again.');
        }
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleRegister}>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Registration;


