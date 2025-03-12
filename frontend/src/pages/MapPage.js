/**
 * MapPage.js
 * 
 * React component for the main page of the temperature map application.
 * Provides a date selector and a button to fetch temperature data from the backend API.
 * Displays a loading indicator while data is being fetched.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import DateSelector from '../components/DateSelector';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

/**
 * MapPage component that displays the map and handles temperature data fetching.
 * 
 * @component
 * @param {Function} setAuthenticated - Function to update the app's authentication state.
 * @returns {JSX.Element} The rendered map page with temperature markers, a logout button, and a loading indicator.
 */
function MapPage({ setAuthenticated }) {
  const [date, setDate] = useState('');
  const [temperatureData, setTemperatureData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  /**
   * Handles the selected date change from DateSelector component.
   * 
   * @param {string} selectedDate - The selected date string in YYYY-MM format.
   */
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);  // Update date state
  };

  /**
   * fetchTemperatureData
   * 
   * Fetches temperature data from the backend for the selected date.
   * Shows a loading indicator while data is being fetched.
   * 
   * @async
   * @function
   */
  const fetchTemperatureData = async () => {
    const API_URL = process.env.REACT_APP_API_URL || '';
    if (!date) {
      alert("Please select a date.");
      return;
    }
    
    setIsLoading(true); 
    console.log(`Fetching temperature data for date: ${date}`);

    try {
      const response = await axios.get(API_URL + `/api/temperature/temperature-data`, {
        params: { date },
      });
      setTemperatureData(response.data);
      console.log("Temperature data received:", response.data);
    } catch (error) {
      console.error("Failed to fetch temperature data:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  /**
   * handleLogout
   * 
   * Logs out the user by clearing authentication state and local storage,
   * then navigating to the login page.
   */
  const handleLogout = () => {
    setAuthenticated(false);  
    localStorage.removeItem('authenticated');  
    navigate('/');  
  };

  return (
    <div>
      <h1>Monthly Average Temperatures in West Virginia</h1>
      
      {/* DateSelector component allows user to select a date and trigger data fetch */}
      <DateSelector onDateChange={handleDateChange} fetchTemperatureData={fetchTemperatureData} />

      {/* Loading Indicator */}
      {isLoading && <ClipLoader color="#123abc" loading={isLoading} size={50} />}

      {/* MapComponent displays the temperature data as markers on the map */}
      {!isLoading && <MapComponent temperatures={temperatureData} />}

      {/* Logout button triggers the handleLogout function */}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  );
}

export default MapPage;
