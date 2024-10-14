import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import axios from 'axios';

function App() {
  const [temperatures, setTemperatures] = useState([]);

  useEffect(() => {
    const fetchTemperatures = async () => {
      const response = await axios.get('https://api.noaa.gov/temperature-wv'); // Use the correct NOAA API endpoint
      // Parse response and set temperatures
      setTemperatures(response.data);
    };

    fetchTemperatures();
  }, []);

  return (
    <div className="App">
      <h1>Recent Temperatures in West Virginia</h1>
      <MapComponent temperatures={temperatures} />
    </div>
  );
}

export default App;
