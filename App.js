/**
 * App.js
 * 
 * Main entry point of the application with persistent authentication using local storage.
 * It sets up routing for the login/register page and the map page, and manages authentication state.
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MapPage from './MapPage';
import Login from './Login';
import Register from './Register';

/**
 * Main application component that manages routes and authentication state.
 * @returns {JSX.Element} The rendered application with routes.
 */
function App() {
  // Initialize authenticated state from local storage
  const [authenticated, setAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('authenticated')) || false
  );

  // Update local storage whenever `authenticated` state changes
  useEffect(() => {
    localStorage.setItem('authenticated', JSON.stringify(authenticated));
  }, [authenticated]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authenticated ? (
              <Navigate to="/map" />
            ) : (
              <>
                <Login setAuthenticated={setAuthenticated} />
                <Register />
              </>
            )
          }
        />
        <Route
          path="/map"
          element={
            authenticated ? (
              <MapPage setAuthenticated={setAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
