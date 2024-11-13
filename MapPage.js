/**
 * MapPage.js
 * 
 * This component displays the map with temperature data and provides a logout button. 
 * It is only accessible if the user is authenticated.
 */

import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import axios from 'axios';


/**
 * MapPage component displays an interactive map with temperature markers and a logout button.
 * @param {Function} setAuthenticated - Function to update authentication state for logging out.
 * @returns {JSX.Element} The map page with logout functionality.
 */
const MapPage = ({ setAuthenticated }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const date = "2022-06-01"; // Set a static date for now

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

  return (
    <div>
      <h1>Temperatures in West Virginia on {date}</h1>
      <MapComponent temperatures={temperatureData} />
    </div>
  );
};

export default MapPage;