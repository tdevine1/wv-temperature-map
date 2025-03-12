/**
 * DateSelector.js
 * 
 * React component for selecting a month and year to specify a date in the format 'YYYY-MM'.
 * Uses dropdowns to limit user input, ensuring only valid months and years are selected.
 * Provides a button to trigger data fetching for the selected date.
 */

import React, { useState } from 'react';

/**
 * DateSelector component for selecting a month and year.
 * 
 * @component
 * @param {Function} onDateChange - Function to update the selected date in the parent component.
 * @param {Function} fetchTemperatureData - Function to fetch temperature data based on the selected date.
 * @returns {JSX.Element} A date selector with month and year dropdowns and a fetch button.
 */
function DateSelector({ onDateChange, fetchTemperatureData }) {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Define the range of years (1951-2022 for the nclimgrid_monthly data)
  const endYear = 2022;
  const startYear = 1951;

  /**
   * handleMonthChange
   * 
   * Updates the selected month and triggers the onDateChange function if both month and year are selected.
   * 
   * @param {Object} e - The change event triggered by the month dropdown.
   */
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    if (year) onDateChange(`${year}-${e.target.value}-01`);
  };

  /**
   * handleYearChange
   * 
   * Updates the selected year and triggers the onDateChange function if both month and year are selected.
   * 
   * @param {Object} e - The change event triggered by the year dropdown.
   */
  const handleYearChange = (e) => {
    setYear(e.target.value);
    if (month) onDateChange(`${e.target.value}-${month}-01`);
  };

  return (
    <div>
      {/* Month Dropdown */}
      <label>Month:</label>
      <select value={month} onChange={handleMonthChange}>
        <option value="" disabled>Select month</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
            {new Date(0, i).toLocaleString('en', { month: 'long' })}
          </option>
        ))}
      </select>

      {/* Year Dropdown */}
      <label>Year:</label>
      <select value={year} onChange={handleYearChange}>
        <option value="" disabled>Select year</option>
        {Array.from({ length: endYear - startYear + 1 }, (_, i) => (
          <option key={i} value={startYear + i}>
            {startYear + i}
          </option>
        ))}
      </select>

      {/* Fetch Data Button */}
      <button onClick={fetchTemperatureData}>Fetch Data</button>
    </div>
  );
}

export default DateSelector;
