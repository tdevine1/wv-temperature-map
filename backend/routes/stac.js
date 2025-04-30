// backend/routes/stac.js
import express from 'express';
import fetch from 'node-fetch';
import parseGeoraster from 'georaster';      // npm install georaster
import geoblaze from 'geoblaze';            // npm install geoblaze

const router = express.Router();
const STAC_SEARCH = 'https://planetarycomputer.microsoft.com/api/stac/v1/search';
const SIGN_URL = 'https://planetarycomputer.microsoft.com/api/sas/v1/sign';
const BBOX = [-82.644739, 37.201483, -77.719519, 40.638801]; // [west, south, east, north] for WV
const MAX_POINTS = 10000;

function c2f(c) {
  return c * 9/5 + 32;
}

async function signHref(href) {
  console.log('Signing URL:', href);
  const res = await fetch(`${SIGN_URL}?href=${encodeURIComponent(href)}`);
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  console.log('Sign response JSON:', json);
  if (!json.href) throw new Error('No `href` field returned from sign API');
  return json.href;
}

router.get('/:date', async (req, res) => {
  const date = req.params.date;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  // 1) Find the monthly item
  const payload = {
    collections: ['noaa-nclimgrid-monthly'],
    bbox:        BBOX,
    datetime:    `${date.split('-').slice(0, 2).join('-')}-15T00:00:00Z`
  };
  const stacRes = await fetch(STAC_SEARCH, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:     JSON.stringify(payload)
  });
  const stacJson = await stacRes.json();
  if (!stacRes.ok || !stacJson.features?.length) {
    return res.status(stacRes.status || 404).json({ error: 'No data' });
  }

  // 2) Grab and sign the first asset’s href
  const item     = stacJson.features[0];
  const assetKey = Object.keys(item.assets)[1];
  const href     = item.assets[assetKey].href;
  const signed   = await signHref(href);

  // 3) Load the GeoTIFF into a GeoRaster
  const arrayBuffer = await (await fetch(signed)).arrayBuffer();
  const georaster   = await parseGeoraster(arrayBuffer);

  // 4) Compute pixel‐index window for WV bbox
  const [west, south, east, north] = BBOX;
  const { xmin, ymax, pixelWidth, pixelHeight, width, height } = georaster;

  const ixStart = Math.max(0, Math.floor((west  - xmin) / pixelWidth));
  const ixEnd   = Math.min(width - 1, Math.ceil((east  - xmin) / pixelWidth));
  const iyStart = Math.max(0, Math.floor((ymax - north) / pixelHeight));
  const iyEnd   = Math.min(height - 1, Math.ceil((ymax - south) / pixelHeight));

  console.log(`Looping ix ${ixStart}→${ixEnd}, iy ${iyStart}→${iyEnd}`);

  // 5) Iterate only that window and collect points
  const points = [];
  let count = 0;

  for (let ix = ixStart; ix <= ixEnd && count < MAX_POINTS; ix++) {
    for (let iy = iyStart; iy <= iyEnd && count < MAX_POINTS; iy++) {
      const cval = georaster.values[0][iy][ix];  // [band][row][col]
      if (cval == null || Number.isNaN(cval)) continue;

      const lon = xmin + ix * pixelWidth;
      const lat = ymax - iy * pixelHeight;

      points.push({
        lat,
        lon,
        tavg: c2f(cval)
      });
      count++;
    }
  }

  res.json(points);
});

export default router;
