# Olympic Full-Stack App

Frontend:

- HTML
- CSS
- JavaScript

Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose

Live data:

- Wikipedia REST API

## Folder Structure

```text
olympic/
  frontend/
    index.html
    style.css
    script.js

  backend/
    server.js
    package.json
    .env.example
```

## Setup

Open terminal:

```bash
cd "c:\Users\visha\OneDrive\Desktop\js revision\olympic\backend"
npm install
```

Create `.env` file in `backend/`:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/olympic
```

Start MongoDB on your computer, then run:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## APIs

- `GET /api/health`
- `GET /api/live-site-data`
- `GET /api/sports`
- `POST /api/sports`
- `GET /api/venues`
- `GET /api/news`
- `GET /api/search?q=swimming`

## What Is Real-Time Here?

The frontend calls `/api/live-site-data` when the page loads and again every 60 seconds.

The backend:

1. Fetches real Olympic/venue data from Wikipedia REST API.
2. Saves the fetched data in MongoDB.
3. Reads data from MongoDB.
4. Sends it to the frontend.

If MongoDB is not running, the app still shows fallback data so the page does not break.
