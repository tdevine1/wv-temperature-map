/**
 * Login.js
 * 
 * This component provides a login form that authenticates the user.
 * Upon successful login, it updates the authentication state and navigates to the map page.
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Login component allows users to enter credentials to access the app.
 * @param {Function} setAuthenticated - Function to update the app's authentication state.
 * @returns {JSX.Element} The login form.
 */
const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || ''; // Fallback for local development
  /**
   * handleSubmit
   * 
   * Handles form submission by sending credentials to the backend for verification.
   * Updates authentication state and navigates to the map page upon success.
   * 
   * @param {Object} e - Event object from the form submission.
   * @async
   * @function
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        API_URL + '/auth/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.message === 'Login successful') {
        setAuthenticated(true);
        navigate('/'); // Redirect to main page
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {/* Link to the Register page */}
      <p style={{ marginTop: '10px' }}>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
