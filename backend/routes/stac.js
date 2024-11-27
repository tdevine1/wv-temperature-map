const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

/**
 * GET /api/temperature-data
 * 
 * Retrieves temperature data for a specified date by executing the Python script.
 * 
 * @param {string} req.query.date - The date (YYYY-MM-DD) for data retrieval.
 * @returns {JSON} JSON response containing temperature data (latitude, longitude, tavg).
 */
router.get('/temperature-data', (req, res) => {
    const date = req.query.date;

    // Validate date parameter format (YYYY-MM-DD)
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!date || !isValidDate) {
        return res.status(400).json({ error: 'Invalid date format. Expected format: YYYY-MM-DD' });
    }

    // Execute the Python script with the specified date
    exec(`python3 get_temperature_data.py ${date}`, { maxBuffer: 500 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error.message}`);
            return res.status(500).json({
                error: 'Failed to execute temperature data retrieval script',
                details: error.message
            });
        }

        if (stderr) {
            console.warn(`Script warning output: ${stderr}`);  // Log any warnings to console but don’t treat as fatal
        }

        try {
            // Parse JSON output from the Python script
            const data = JSON.parse(stdout);
            res.json(data);
        } catch (parseError) {
            console.error(`JSON parsing error: ${parseError}`);
            // console.error(`Raw script output: ${stdout}`);  // Log raw output for debugging
            res.status(500).json({
                error: 'Failed to parse temperature data',
                details: parseError.message
            });
        }
    });
});

module.exports = router;
