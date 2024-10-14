import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ temperatures }) => {
  const center = [38.5976, -80.4549]; // Approximate center of WV

  return (
    <MapContainer center={center} zoom={7} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {temperatures.map((temp, index) => (
        <Marker key={index} position={[temp.lat, temp.lon]}>
          <Popup>
            {temp.name}: {temp.temperature}°F
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
