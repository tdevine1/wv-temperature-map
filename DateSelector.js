/**
 * DateSelector.js
 * 
 * Component for selecting a date and triggering data fetch based on that date.
 */

import React from 'react';

/**
 * DateSelector component
 * 
 * Allows user to select a date and fetch data for that specific date.
 * @param {string} date - The selected date in the format YYYY-MM-DD.
 * @param {Function} setDate - Function to update the date state in MapPage.
 * @param {Function} fetchTemperatureData - Function to fetch temperature data based on selected date.
 * @returns {JSX.Element} Rendered DateSelector component.
 */
const DateSelector = ({ date, setDate, fetchTemperatureData }) => {

  /**
   * handleDateChange
   * 
   * Updates the date when a new date is selected from the input.
   * 
   * @param {Object} e - Event object from date input.
   */
  const handleDateChange = (e) => {
    setDate(e.target.value);  // Update date state in MapPage
  };

  return (
    <div>
      {/* Date input field */}
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
      />
      {/* Button to fetch data for selected date */}
      <button onClick={fetchTemperatureData}>Get Temperature Data</button>
    </div>
  );
};

export default DateSelector;
