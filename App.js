import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import MapComponent from './MapComponent';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      {!authenticated ? (
        <>
          <Login setAuthenticated={setAuthenticated} />
          <Register />
        </>
      ) : (
        <>
          <h1>Recent Temperatures in West Virginia</h1>
          <MapComponent />
        </>
      )}
    </div>
  );
}

export default App;
