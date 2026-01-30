// Google Sheets API Service
// This module handles all interactions with Google Sheets

const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID;
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

// Helper to build API URLs
const buildUrl = (sheetName, range = '') => {
  const rangeParam = range ? `!${range}` : '';
  return `${BASE_URL}/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}${rangeParam}?key=${API_KEY}`;
};

// Fetch all pizza places from the master sheet
export const getPlaces = async () => {
  if (!API_KEY || !SPREADSHEET_ID) {
    console.warn('Google Sheets API not configured. Using local data.');
    return null;
  }

  try {
    const response = await fetch(buildUrl('Pizza_Places', 'A2:H'));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.values) {
      return [];
    }

    return data.values.map(row => ({
      place_id: row[0],
      name: row[1],
      neighborhood: row[2],
      latitude: parseFloat(row[3]),
      longitude: parseFloat(row[4]),
      sheet_name: row[5],
      google_maps_link: row[6],
      active: row[7] === 'TRUE'
    })).filter(place => place.active);
  } catch (error) {
    console.error('Error fetching places from Google Sheets:', error);
    throw error;
  }
};

// Fetch reviews for a specific pizza place
export const getReviews = async (sheetName) => {
  if (!API_KEY || !SPREADSHEET_ID) {
    console.warn('Google Sheets API not configured. Using local data.');
    return null;
  }

  try {
    const response = await fetch(buildUrl(sheetName, 'A2:H'));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.values) {
      return [];
    }

    return data.values.map(row => ({
      review_id: row[0],
      timestamp: row[1],
      nickname: row[2],
      slice_type: row[3],
      pizza_style: row[4],
      rating: parseInt(row[5], 10),
      comment: row[6] || '',
      photo_url: row[7] || null
    }));
  } catch (error) {
    console.error('Error fetching reviews from Google Sheets:', error);
    throw error;
  }
};

// Append a new review to a pizza place's sheet
// Note: This requires a service account with write access
export const appendReview = async (sheetName, review) => {
  if (!API_KEY || !SPREADSHEET_ID) {
    console.warn('Google Sheets API not configured. Cannot submit review.');
    return null;
  }

  try {
    const url = `${BASE_URL}/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;

    const values = [[
      review.review_id || `r${Date.now()}`,
      review.timestamp || new Date().toISOString(),
      review.nickname,
      review.slice_type,
      review.pizza_style,
      review.rating,
      review.comment || '',
      review.photo_url || ''
    ]];

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error appending review to Google Sheets:', error);
    throw error;
  }
};

// Append a new place suggestion to the submissions sheet
export const appendSubmission = async (submission) => {
  if (!API_KEY || !SPREADSHEET_ID) {
    console.warn('Google Sheets API not configured. Cannot submit suggestion.');
    return null;
  }

  try {
    const url = `${BASE_URL}/${SPREADSHEET_ID}/values/${encodeURIComponent('New_Submissions')}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;

    const values = [[
      `s${Date.now()}`,
      new Date().toISOString(),
      submission.name,
      submission.google_maps_link,
      'pending',
      ''
    ]];

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error appending submission to Google Sheets:', error);
    throw error;
  }
};

export default {
  getPlaces,
  getReviews,
  appendReview,
  appendSubmission
};
