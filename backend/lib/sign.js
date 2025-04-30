// backend/lib/sign.js
import fetch from 'node-fetch';

const SIGN_ENDPOINT = 'https://planetarycomputer.microsoft.com/api/sas/v1/sign';

/**
 * Sign any href by calling the Planetary Computer SAS API.
 * @param {string} href  The URL (COG or STAC-search endpoint) to sign
 * @returns {Promise<string>}  A signed URL you can fetch
 */
export async function signUrl(href) {
  const url = `${SIGN_ENDPOINT}?href=${encodeURIComponent(href)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to sign URL: ${res.status} ${body}`);
  }
  const json = await res.json();
  return json.url;  // the signed href
}
