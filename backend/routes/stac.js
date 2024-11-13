const express = require('express');
const axios = require('axios');
const router = express.Router();

// Planetary Computer STAC endpoint
const STAC_API_URL = 'https://planetarycomputer.microsoft.com/api/stac/v1/search';

/**
 * Fetch temperature data for a specific date from STAC API.
 * @route GET /api/temperature/:date
 * @param {string} date - Date for the temperature data in YYYY-MM-DD format.
 */
router.get('/:date', async (req, res) => {
  const date = req.params.date;
  const bbox = [-82.6447, 37.2015, -77.7195, 40.6388]; // WV bounds

  try {
    const response = await axios.post(STAC_API_URL, {
      bbox: bbox,
      datetime: `${date}T00:00:00Z/${date}T23:59:59Z`,
      collections: ["goes-lst"],
      limit: 100
    });

    const temperatureData = response.data.features.map(feature => ({
      lat: feature.geometry.coordinates[1],
      lon: feature.geometry.coordinates[0],
      temperature: feature.properties.temperature
    }));

    res.json(temperatureData);
  } catch (error) {
    console.error("Error fetching temperature data:", error);
    res.status(500).json({ error: 'Failed to retrieve temperature data' });
  }
});

module.exports = router;
