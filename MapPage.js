/**
 * MapPage.js
 * 
 * This component displays an interactive map of temperature data for locations in West Virginia.
 * It includes a logout button that allows the user to end their session and navigate to the login page.
 * The map and temperature data are rendered by the child `MapComponent`.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import MapComponent from './MapComponent';
import axios from 'axios';

/**
 * MapPage component that displays the map and handles temperature data fetching.
 * @param {Function} setAuthenticated - Function to update the app's authentication state.
 * @returns {JSX.Element} The rendered map page with temperature markers and a logout button.
 */
const MapPage = ({ setAuthenticated }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const date = "2022-06-01"; // Static date for testing purposes
  const navigate = useNavigate(); // Initialize navigate hook

  /**
   * Fetches temperature data for a specific date from the backend API.
   * This function runs when the component mounts and whenever the `date` variable changes.
   */
  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await axios.get(`/api/temperature/${date}`);
        setTemperatureData(response.data);
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };
    fetchTemperatureData();
  }, [date]);

/**
 * Logs out the user by clearing authentication state and local storage,
 * then navigating to the login page.
 */
const handleLogout = () => {
  setAuthenticated(false); // Update authentication state to log out
  localStorage.removeItem('authenticated'); // Remove from local storage
  navigate('/'); // Redirect to the login/register page
};


  return (
    <div>
      <h1>Temperatures in West Virginia on {date}</h1>
      {/* MapComponent displays the temperature data as markers on the map */}
      <MapComponent temperatures={temperatureData} />
      {/* Logout button triggers the handleLogout function */}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  );
};

export default MapPage;
