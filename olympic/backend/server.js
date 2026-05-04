const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/olympic";
const FRONTEND_ROOT = path.join(__dirname, "..", "frontend");
const WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1/page/summary";
const LIVE_REFRESH_MS = 1000 * 60 * 10;

let mongoConnected = false;
let lastLiveFetch = 0;

const fallbackData = {
  sports: [
    {
      title: "Swimming",
      description: "Racing, relays, and world-record energy in the pool.",
      icon: "waves"
    },
    {
      title: "Basketball",
      description: "Fast breaks, packed arenas, and medal games under bright lights.",
      icon: "court"
    },
    {
      title: "Athletics",
      description: "Sprints, jumps, throws, and the marathon through the city.",
      icon: "track"
    },
    {
      title: "Skateboarding",
      description: "Street and park contests with Southern California roots.",
      icon: "board"
    }
  ],
  venues: [
    {
      title: "Los Angeles Memorial Coliseum",
      description: "Historic Los Angeles stadium connected with the Olympic Games.",
      art: "stadium",
      url: "https://en.wikipedia.org/wiki/Los_Angeles_Memorial_Coliseum",
      image: ""
    },
    {
      title: "SoFi Stadium",
      description: "Modern multi-purpose stadium in Inglewood, California.",
      art: "arena",
      url: "https://en.wikipedia.org/wiki/SoFi_Stadium",
      image: ""
    },
    {
      title: "Rose Bowl",
      description: "Outdoor stadium in Pasadena, California.",
      art: "beach",
      url: "https://en.wikipedia.org/wiki/Rose_Bowl_(stadium)",
      image: ""
    }
  ],
  news: [
    {
      category: "Olympic Games",
      title: "LA28 Olympic Games",
      description: "Live data will appear here when the backend can reach Wikipedia.",
      url: ""
    }
  ]
};

const sportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "track" }
  },
  { timestamps: true }
);

const venueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    art: { type: String, default: "stadium" },
    url: { type: String, default: "" },
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

const newsSchema = new mongoose.Schema(
  {
    category: { type: String, default: "News" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, default: "" }
  },
  { timestamps: true }
);

const metaSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    source: String,
    title: String,
    description: String,
    extract: String,
    url: String,
    image: String,
    fetchedAt: String
  },
  { timestamps: true }
);

const Sport = mongoose.model("Sport", sportSchema);
const Venue = mongoose.model("Venue", venueSchema);
const News = mongoose.model("News", newsSchema);
const Meta = mongoose.model("Meta", metaSchema);

app.use(cors());
app.use(express.json());
app.use(express.static(FRONTEND_ROOT));

async function connectDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    mongoConnected = true;
    console.log("MongoDB connected");
    await seedDatabase();
  } catch (error) {
    mongoConnected = false;
    console.log(`MongoDB not connected: ${error.message}`);
    console.log("App will run with fallback data until MongoDB is available.");
  }
}

async function seedDatabase() {
  const sportCount = await Sport.countDocuments();
  const venueCount = await Venue.countDocuments();
  const newsCount = await News.countDocuments();

  if (sportCount === 0) {
    await Sport.insertMany(fallbackData.sports);
  }

  if (venueCount === 0) {
    await Venue.insertMany(fallbackData.venues);
  }

  if (newsCount === 0) {
    await News.insertMany(fallbackData.news);
  }
}

async function fetchWikipediaSummary(title) {
  const response = await fetch(`${WIKIPEDIA_API}/${encodeURIComponent(title)}`, {
    headers: {
      "User-Agent": "OlympicFullStackStudentApp/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`Wikipedia request failed for ${title}`);
  }

  const data = await response.json();

  return {
    title: data.title,
    description: data.description || "",
    extract: data.extract || "",
    url: data.content_urls?.desktop?.page || "",
    image: data.thumbnail?.source || "",
    fetchedAt: new Date().toISOString()
  };
}

async function syncLiveData() {
  if (!mongoConnected) {
    return getFallbackSiteData("Fallback data - MongoDB is not connected");
  }

  const shouldRefresh = Date.now() - lastLiveFetch > LIVE_REFRESH_MS;

  if (shouldRefresh) {
    const [games, coliseum, sofi, roseBowl] = await Promise.all([
      fetchWikipediaSummary("2028 Summer Olympics"),
      fetchWikipediaSummary("Los Angeles Memorial Coliseum"),
      fetchWikipediaSummary("SoFi Stadium"),
      fetchWikipediaSummary("Rose Bowl (stadium)")
    ]);

    await Meta.findOneAndUpdate(
      { key: "games" },
      {
        key: "games",
        source: "Wikipedia REST API",
        ...games
      },
      { upsert: true, new: true }
    );

    await Venue.deleteMany({});
    await Venue.insertMany([
      {
        title: coliseum.title,
        description: coliseum.extract,
        art: "stadium",
        url: coliseum.url,
        image: coliseum.image
      },
      {
        title: sofi.title,
        description: sofi.extract,
        art: "arena",
        url: sofi.url,
        image: sofi.image
      },
      {
        title: roseBowl.title,
        description: roseBowl.extract,
        art: "beach",
        url: roseBowl.url,
        image: roseBowl.image
      }
    ]);

    await News.findOneAndUpdate(
      { title: games.title },
      {
        category: "Live Source",
        title: games.title,
        description: games.extract,
        url: games.url
      },
      { upsert: true, new: true }
    );

    lastLiveFetch = Date.now();
  }

  return getDatabaseSiteData();
}

async function getDatabaseSiteData() {
  const [sports, venues, news, games] = await Promise.all([
    Sport.find().sort({ createdAt: 1 }).lean(),
    Venue.find().sort({ createdAt: 1 }).lean(),
    News.find().sort({ updatedAt: -1 }).limit(6).lean(),
    Meta.findOne({ key: "games" }).lean()
  ]);

  return {
    source: games?.source || "MongoDB",
    updatedAt: games?.updatedAt || new Date().toISOString(),
    database: "MongoDB",
    games: games || {
      title: "LA 2028 Olympic Games",
      extract: "MongoDB is connected. Live Olympic data will appear after the first sync.",
      url: "",
      image: ""
    },
    sports,
    venues,
    news
  };
}

function getFallbackSiteData(source) {
  return {
    source,
    updatedAt: new Date().toISOString(),
    database: "Fallback memory data",
    games: {
      title: "LA 2028 Olympic Games",
      extract: "Start MongoDB to save and read data from the database. The app is currently showing fallback data.",
      url: "",
      image: ""
    },
    ...fallbackData
  };
}

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    backend: "Node.js + Express.js",
    database: mongoConnected ? "MongoDB connected" : "MongoDB not connected",
    time: new Date().toISOString()
  });
});

app.get("/api/live-site-data", async (request, response) => {
  try {
    const data = await syncLiveData();
    response.json(data);
  } catch (error) {
    response.json(getFallbackSiteData(`Fallback data - ${error.message}`));
  }
});

app.get("/api/sports", async (request, response) => {
  if (!mongoConnected) {
    response.json(fallbackData.sports);
    return;
  }

  response.json(await Sport.find().sort({ createdAt: 1 }));
});

app.post("/api/sports", async (request, response) => {
  if (!mongoConnected) {
    response.status(503).json({ error: "MongoDB is not connected" });
    return;
  }

  const sport = await Sport.create(request.body);
  response.status(201).json(sport);
});

app.get("/api/venues", async (request, response) => {
  if (!mongoConnected) {
    response.json(fallbackData.venues);
    return;
  }

  response.json(await Venue.find().sort({ createdAt: 1 }));
});

app.get("/api/news", async (request, response) => {
  if (!mongoConnected) {
    response.json(fallbackData.news);
    return;
  }

  response.json(await News.find().sort({ updatedAt: -1 }).limit(6));
});

app.get("/api/search", async (request, response) => {
  const query = String(request.query.q || "").trim().toLowerCase();

  if (!query) {
    response.json({ query, results: [] });
    return;
  }

  const siteData = mongoConnected ? await getDatabaseSiteData() : getFallbackSiteData("Fallback search");
  const results = [
    ...siteData.sports.map((item) => ({ type: "Sport", ...item })),
    ...siteData.venues.map((item) => ({ type: "Venue", ...item })),
    ...siteData.news.map((item) => ({ type: "News", ...item }))
  ].filter((item) => `${item.type} ${item.title} ${item.description}`.toLowerCase().includes(query));

  response.json({ query, results });
});

app.get("*", (request, response) => {
  response.sendFile(path.join(FRONTEND_ROOT, "index.html"));
});

connectDatabase().finally(() => {
  const server = app.listen(PORT, () => {
    console.log(`Olympic app running at http://localhost:${PORT}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is already in use.`);
      console.log("Stop the old server with Ctrl + C, or run this app on another port.");
      console.log(`Example: set PORT=3001 && npm start`);
      process.exit(1);
    }

    throw error;
  });
});
