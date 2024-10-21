import React, { useState } from 'react';
import MapComponent from './MapComponent';

function App() {
  const mockData = [
    { lat: 38.3498, lon: -81.6326, name: 'Charleston', temperature: 72 },
    { lat: 39.6295, lon: -79.9559, name: 'Morgantown', temperature: 68 },
    { lat: 37.7782, lon: -81.1855, name: 'Beckley', temperature: 70 },
    { lat: 39.264, lon: -80.239, name: 'Clarksburg', temperature: 65 },
    { lat: 39.3417, lon: -77.7311, name: 'Harpers Ferry', temperature: 67 },
    { lat: 37.2695, lon: -81.2224, name: 'Bluefield', temperature: 66 },
  ];

  const [temperatures] = useState(mockData); // Use mock data

  return (
    <div className="App">
      <h1>Recent Temperatures in West Virginia (Mock Data)</h1>
      <MapComponent temperatures={temperatures} />
    </div>
  );
}

export default App;
