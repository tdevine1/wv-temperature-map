/**
 * MapPage.js
 * 
 * This component displays the map with temperature data and provides a logout button. 
 * It is only accessible if the user is authenticated.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';

const mockData = [
  { lat: 38.3498, lon: -81.6326, name: 'Charleston', temperature: 72 },
  { lat: 39.6295, lon: -79.9559, name: 'Morgantown', temperature: 68 },
  { lat: 37.7782, lon: -81.1855, name: 'Beckley', temperature: 70 },
  { lat: 39.264, lon: -80.239, name: 'Clarksburg', temperature: 65 },
  { lat: 39.3417, lon: -77.7311, name: 'Harpers Ferry', temperature: 67 },
  { lat: 37.2695, lon: -81.2224, name: 'Bluefield', temperature: 66 },
];
/**
 * MapPage component displays an interactive map with temperature markers and a logout button.
 * @param {Function} setAuthenticated - Function to update authentication state for logging out.
 * @returns {JSX.Element} The map page with logout functionality.
 */
const MapPage = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  /**
   * Logs out the user by updating authentication state and navigating to the login page.
   */
  const handleLogout = () => {
    setAuthenticated(false); // Update authentication state
    navigate('/'); // Redirect to the login/register page
  };

  return (
    <div>
      <h1>Recent Temperatures in West Virginia</h1>
      <MapComponent temperatures={mockData} />
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  );
};

export default MapPage;
