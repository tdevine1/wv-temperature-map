/**
 * Login.js
 * 
 * This component provides a login form that authenticates the user.
 * Upon successful login, it updates the authentication state and navigates to the map page.
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Login component allows users to enter credentials to access the app.
 * @param {Function} setAuthenticated - Function to update the app's authentication state.
 * @returns {JSX.Element} The login form.
 */
const Login = ({ setAuthenticated }) => {
  // State variables to store the user's input for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // useNavigate hook for programmatic navigation after successful login
  const navigate = useNavigate();

  /**
   * Handles form submission by sending credentials to the backend for verification.
   * @param {Object} e - Event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request with username and password to backend
      const response = await axios.post(
        'http://localhost:5000/auth/login',
        { username, password },
        { withCredentials: true } // Allows cookies to be sent with the request
      );

      // If login is successful, update the authentication status and navigate to the map page
      if (response.data.message === 'Login successful') {
        setAuthenticated(true);
        navigate('/map');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
      <h2>Login</h2>
      {/* Input for username */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Input for password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
