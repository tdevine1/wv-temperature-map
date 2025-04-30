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
    const marker_radius = 10;
    const marker_fillOpacity = 0.4;


    /**
     * getColor
     * 
     * Determines the color for the marker based on temperature.
     * Provides a gradient for better visualization.
     * 
     * @function
     * @param {number} tavg - The average temperature value.
     * @returns {string} Color code for the marker.
     */
    const getColor = (tavg) => {
        if (tavg < 0) return "#002366";      // Very cold (dark blue)
        if (tavg < 20) return "#4169E1";     // Cold (royal blue)
        if (tavg < 40) return "#87CEEB";     // Cool (sky blue)
        if (tavg < 60) return "#FFFF66";     // Mild (light yellow)
        if (tavg < 80) return "#FFD700";     // Warm (gold)
        if (tavg < 100) return "#FF4500";    // Hot (orange-red)
        return "#B22222";                    // Very hot (firebrick red)
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
                    center={[point.lat, point.lon]}
                    radius={marker_radius}
                    color={getColor(point.tavg)}
                    fillOpacity={marker_fillOpacity}
                    stroke={false} // Removes the marker border for cleaner look
                >
                    <Popup>
                        <div>
                            <p><strong>Latitude:</strong> {point.lat.toFixed(4)}</p>
                            <p><strong>Longitude:</strong> {point.lon.toFixed(4)}</p>
                            <p><strong>Avg Temp:</strong> {point.tavg.toFixed(2)} °F</p>
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}

export default MapComponent;
