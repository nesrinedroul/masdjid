import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Registration from './Registration';
import Login from './Login';
import App1 from './App1';
import Footer from './Footer';
import Popup from './Popup';
import Chatbot from './Chatbot';
import Profile from './Profile';
import NavBar from './NavBar';
import ChildRegistration from './ChildRegistration';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [hasVisitedAbout, setHasVisitedAbout] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    console.log('Stored Token:', storedToken);
    if (storedToken) {
      axios.get('https://mohannednes.pythonanywhere.com/auth/protected', {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
        withCredentials: true
      })
      .then(response => {
        const data = response.data;
        if (data.valid) {
          setIsAuthenticated(true);
          setCurrentUser(data.user);
          setToken(storedToken);
        } else {
          localStorage.removeItem('access_token');
        }
      })
      .catch(error => {
        console.error('Error verifying token:', error);
        localStorage.removeItem('access_token');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleRegister = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setToken(localStorage.getItem('access_token')); // Ensure token is set after login
  };

  const toggleForm = () => {
    setShowLogin(prev => !prev);
  };

  const handleScroll = () => {
    if (!hasVisitedAbout) {
      const scrollPosition = window.scrollY;
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        const triggerPosition = aboutSection.offsetTop;
        if (scrollPosition + window.innerHeight > triggerPosition) {
          setShowPopup(true);
          setHasVisitedAbout(true);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasVisitedAbout]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleProfileUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  return (
    <Router>
      <div className="auth-page-container">
        {isAuthenticated && <NavBar />}

        {showPopup && <Popup onClose={closePopup} />}

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <Routes>
            <Route
              path="/auth"
              element={
                <div className="con">
                  <div className={`container ${showLogin ? '' : 'active'}`} id="container">
                    {showLogin ? (
                      <>
                        <Login onLogin={handleLogin} />
                        <div className="toggle-container">
                          <div className="toggle">
                            <div className="toggle-panel toggle-right">
                              <h1>Hello!</h1>
                              <p>Register with your personal details to use all of our site features</p>
                              <button className="hidden" onClick={toggleForm}>
                                Register
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <Registration onRegister={handleRegister} />
                        <div className="toggle-container">
                          <div className="toggle">
                            <div className="toggle-panel toggle-left">
                              <h1>Welcome Back!</h1>
                              <p>Enter your personal details to use all of our site features</p>
                              <button className="hidden" onClick={toggleForm}>
                                Sign In
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              }
            />

            <Route
              path="/app"
              element={
                isAuthenticated ? (
                  <>
                    <App1 />
                    <Chatbot />
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />

            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile user={currentUser} onUpdate={handleProfileUpdate} />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />

            <Route
              path="/register-child"
              element={
                isAuthenticated ? (
                  <ChildRegistration token={token} />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />

            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/app" : "/auth"} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
