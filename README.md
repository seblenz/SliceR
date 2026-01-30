# SliceR - NYC Pizza Slice Rating App

A Progressive Web App (PWA) for crowdsourcing pizza slice ratings across New York City. Users can browse pizza places on an interactive map, rate individual slices, and suggest new locations for review.

## Features

- **Interactive Map**: Browse NYC pizza spots with pizza emoji markers
- **Slice Ratings**: Rate slices 1-10 using pizza emojis
- **Reviews**: Submit detailed reviews with slice type, style, and photos
- **Comments**: Engage with other users' reviews
- **Suggest Places**: Submit new pizza spots for admin review
- **Rate Limiting**: 3 reviews per device per day (anti-spam)
- **PWA Support**: Works offline, installable on mobile devices

## Tech Stack

- **Frontend**: React 18
- **Map**: Leaflet with OpenStreetMap tiles (free, no API key required)
- **Backend**: Google Sheets API (spreadsheet-based data management)
- **Image Storage**: Cloudinary (free tier)
- **Hosting**: GitHub Pages (free)

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Google Cloud project with Sheets API enabled (optional for development)
- Cloudinary account (optional for image uploads)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/slicer.git
   cd slicer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. (Optional) Add your API credentials to `.env`:
   ```
   REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key
   REACT_APP_GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

5. Start the development server:
   ```bash
   npm start
   ```

The app works with local demo data if API credentials are not configured.

## Project Structure

```
slicer/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
│   └── icons/
├── src/
│   ├── index.js
│   ├── App.jsx
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Map.jsx
│   │   ├── LocationPanel.jsx
│   │   ├── ReviewForm.jsx
│   │   ├── SubmitPlaceForm.jsx
│   │   ├── RatingDisplay.jsx
│   │   ├── RatingSelector.jsx
│   │   ├── ReviewCard.jsx
│   │   └── Toast.jsx
│   ├── hooks/
│   │   ├── useGoogleSheets.js
│   │   └── useReviewLimit.js
│   ├── services/
│   │   ├── sheetsApi.js
│   │   └── imageUpload.js
│   ├── data/
│   │   └── initialPizzaPlaces.js
│   └── styles/
│       └── globals.css
├── .env.example
├── package.json
└── README.md
```

## Google Sheets Setup (Optional)

To use Google Sheets as your backend:

1. Create a Google Cloud project
2. Enable the Google Sheets API
3. Create an API key
4. Create a spreadsheet with the following sheets:
   - **Pizza_Places**: Master list of all pizza locations
   - **New_Submissions**: User-submitted place suggestions
   - Individual sheets for each pizza place's reviews

See the full specification in the project documentation for sheet column structures.

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm test` - Run tests

## Initial Pizza Places

The app comes pre-seeded with 10 real NYC pizza spots:

1. Joe's Pizza (Greenwich Village)
2. Di Fara Pizza (Midwood, Brooklyn)
3. Lucali (Carroll Gardens, Brooklyn)
4. Prince Street Pizza (Nolita)
5. L'industrie Pizzeria (Williamsburg)
6. Scarr's Pizza (Lower East Side)
7. Corner Slice (Williamsburg)
8. Paulie Gee's Slice Shop (Greenpoint)
9. Rubirosa (Nolita)
10. NY Pizza Suprema (Midtown)

## Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` to match your GitHub username:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/SliceR"
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. In your GitHub repository settings:
   - Go to Settings > Pages
   - Set Source to "Deploy from a branch"
   - Select the `gh-pages` branch and `/ (root)` folder
   - Save

Your app will be live at `https://YOUR_USERNAME.github.io/SliceR`

## License

MIT
