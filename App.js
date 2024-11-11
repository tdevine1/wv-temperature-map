/**
 * App.js
 * 
 * This is the main entry point of the application. It sets up routing 
 * for the login/register page and the map page, and manages authentication state.
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import MapPage from './MapPage';

/**
 * App component that manages the structure, routing, and authentication of the app.
 * @returns {JSX.Element} The main app component with routes.
 */
function App() {
  // State variable to track if the user is logged in (authenticated)
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home route ("/"): displays the Login/Register page if not authenticated */}
          <Route
            path="/"
            element={
              authenticated ? (
                // If authenticated, redirect to the map page
                <Navigate to="/map" />
              ) : (
                // Otherwise, show login and register forms
                <>
                  <h1>Please Login or Register</h1>
                  {/* Login component to authenticate the user */}
                  <Login setAuthenticated={setAuthenticated} />
                  {/* Register component for new user registration */}
                  <Register />
                </>
              )
            }
          />
          
          {/* Map route ("/map"): displays the map if authenticated, otherwise redirects to login */}
          <Route
            path="/map"
            element={
              authenticated ? (
                // Show the map page if authenticated
                <MapPage setAuthenticated={setAuthenticated} />
              ) : (
                // Redirect to the login page if not authenticated
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
