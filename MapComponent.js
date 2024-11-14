/**
 * MapComponent.js
 * 
 * React component that renders a map with color-coded markers for temperature data.
 * Each marker represents a location with latitude, longitude, and temperature (tavg),
 * and displays this information in a popup.
 */

import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * MapComponent
 * 
 * Renders a map with markers based on temperature data.
 * Each marker is color-coded based on the average temperature (tavg) and includes a popup
 * with details for latitude, longitude, and temperature.
 * 
 * @component
 * @param {Object[]} [temperatures=[]] - Array of objects with latitude, longitude, and tavg values.
 * @returns {JSX.Element} A map with temperature markers and popups.
 */
function MapComponent({ temperatures = [] }) {
    const center = [38.5976, -80.4549]; // Center of WV

    /**
     * getColor
     * 
     * Determines the color for the marker based on temperature.
     * 
     * @function
     * @param {number} tavg - The average temperature value.
     * @returns {string} Color code for the marker.
     */
    const getColor = (tavg) => {
        if (tavg < 32) return "#0000FF";  // Freezing and below (blue)
        if (tavg < 50) return "#ADD8E6";  // Cool (light blue)
        if (tavg < 70) return "#FFFF00";  // Moderate (yellow)
        if (tavg < 90) return "#FFA500";  // Warm (orange)
        return "#FF0000";                // Hot (red)
    };

    return (
        <MapContainer center={center} zoom={7} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {Array.isArray(temperatures) && temperatures.map((point, index) => (
                <CircleMarker
                    key={index}
                    center={[point.latitude, point.longitude]}
                    radius={5}
                    color={getColor(point.tavg)}
                    fillOpacity={0.6}
                >
                    <Popup>
                        <div>
                            <p><strong>Latitude:</strong> {point.latitude.toFixed(4)}</p>
                            <p><strong>Longitude:</strong> {point.longitude.toFixed(4)}</p>
                            <p><strong>Avg Temp:</strong> {point.tavg.toFixed(2)} °F</p>
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}

export default MapComponent;
