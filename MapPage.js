/**
 * MapPage.js
 * 
 * React component for the main page of the temperature map application.
 * Provides a date selector and a button to fetch temperature data from the backend API.
 * The data is then displayed on the map using the MapComponent.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import DateSelector from './DateSelector';
import axios from 'axios';

/**
 * MapPage component that displays the map and handles temperature data fetching.
 * 
 * @component
 * @param {Function} setAuthenticated - Function to update the app's authentication state.
 * @returns {JSX.Element} The rendered map page with temperature markers and a logout button.
 */
function MapPage({ setAuthenticated }) {
  const [date, setDate] = useState('');  // Selected date for data retrieval
  const [temperatureData, setTemperatureData] = useState([]);  // Array to hold temperature data for the map
  const navigate = useNavigate();  // Hook for programmatic navigation

 /**
 * fetchTemperatureData
 * 
 * Fetches temperature data from the backend for the selected date.
 * 
 * @async
 * @function
 */
 const fetchTemperatureData = async () => {
  if (!date) {
    alert("Please select a date.");
    return;
  }
  console.log(`Fetching temperature data for date: ${date}`);
  try {
    const response = await axios.get(`http://localhost:5000/api/temperature/temperature-data`, {
      params: { date },
    });
    setTemperatureData(response.data);
    console.log("Temperature data received:", response.data);
  } catch (error) {
    console.error("Failed to fetch temperature data:", error);
  }
};
  /**
   * handleLogout
   * 
   * Logs out the user by clearing authentication state and local storage,
   * then navigating to the login page.
   */
  const handleLogout = () => {
    setAuthenticated(false);  // Update authentication state to log out
    localStorage.removeItem('authenticated');  // Clear authentication from local storage
    navigate('/');  // Redirect to the login/register page
  };

  return (
    <div>
      <h1>Temperatures in West Virginia</h1>
      
      {/* DateSelector component allows user to select a date and trigger data fetch */}
      <DateSelector 
        date={date} 
        setDate={setDate} 
        fetchTemperatureData={fetchTemperatureData} 
      />

      {/* MapComponent displays the temperature data as markers on the map */}
      <MapComponent temperatures={temperatureData} />

      {/* Logout button triggers the handleLogout function */}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  );
};

export default MapPage;
