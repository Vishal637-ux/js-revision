const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const menuDrawer = document.getElementById("menuDrawer");
const overlay = document.getElementById("overlay");
const sportsGrid = document.getElementById("sportsGrid");
const venueGrid = document.getElementById("venueGrid");
const newsGrid = document.getElementById("newsGrid");
const gamesSummary = document.getElementById("gamesSummary");
const dataSource = document.getElementById("dataSource");
const updatedAt = document.getElementById("updatedAt");
const apiStatus = document.getElementById("apiStatus");
const dbStatus = document.getElementById("dbStatus");
const sourceLink = document.getElementById("sourceLink");
const refreshButton = document.getElementById("refreshButton");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const sportsCount = document.getElementById("sportsCount");
const venuesCount = document.getElementById("venuesCount");
const newsCount = document.getElementById("newsCount");

function showMenu() {
  menuDrawer.hidden = false;
  overlay.hidden = false;
  document.body.classList.add("no-scroll");
  menuButton.setAttribute("aria-expanded", "true");
}

function hideMenu() {
  menuDrawer.hidden = true;
  overlay.hidden = true;
  document.body.classList.remove("no-scroll");
  menuButton.setAttribute("aria-expanded", "false");
}

function shortText(value, limit = 180) {
  if (!value) {
    return "";
  }

  return value.length > limit ? `${value.slice(0, limit)}...` : value;
}

function renderSports(sports) {
  sportsCount.textContent = `${sports.length} sports`;
  sportsGrid.innerHTML = sports.map((sport) => `
    <article>
      <span class="sport-icon ${sport.icon || "track"}"></span>
      <h3>${sport.title}</h3>
      <p>${sport.description}</p>
    </article>
  `).join("");
}

function renderVenues(venues) {
  venuesCount.textContent = `${venues.length} venues`;
  venueGrid.innerHTML = venues.map((venue) => {
    const imageStyle = venue.image
      ? `style="background-image: linear-gradient(rgba(0,0,0,.16), rgba(0,0,0,.16)), url('${venue.image}')"`
      : "";

    return `
      <article>
        <div class="venue-art ${venue.art || "stadium"}" ${imageStyle}></div>
        <h3>${venue.title}</h3>
        <p>${shortText(venue.description, 165)}</p>
        ${venue.url ? `<a class="card-link" href="${venue.url}" target="_blank" rel="noreferrer">Read source</a>` : ""}
      </article>
    `;
  }).join("");
}

function renderNews(news) {
  newsCount.textContent = `${news.length} stories`;
  newsGrid.innerHTML = news.map((item) => `
    <article>
      <span>${item.category || "News"}</span>
      <h3>${item.title}</h3>
      <p>${shortText(item.description, 190)}</p>
      ${item.url ? `<a class="card-link" href="${item.url}" target="_blank" rel="noreferrer">Read source</a>` : ""}
    </article>
  `).join("");
}

function renderHeader(data) {
  gamesSummary.textContent = data.games.extract;
  dataSource.textContent = data.source;
  updatedAt.textContent = `Updated: ${new Date(data.updatedAt).toLocaleString()}`;
  dbStatus.textContent = `DB: ${data.database}`;

  if (data.games.url) {
    sourceLink.href = data.games.url;
    sourceLink.hidden = false;
  } else {
    sourceLink.hidden = true;
  }
}

async function loadSiteData() {
  apiStatus.textContent = "API: loading";
  refreshButton.disabled = true;

  try {
    const response = await fetch("/api/live-site-data");

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    renderHeader(data);
    renderSports(data.sports || []);
    renderVenues(data.venues || []);
    renderNews(data.news || []);
    apiStatus.textContent = "API: connected";
  } catch (error) {
    apiStatus.textContent = "API: error";
    dbStatus.textContent = "DB: unavailable";
    gamesSummary.textContent = "Could not load backend data. Check the Node.js server.";
    console.warn(error.message);
  } finally {
    refreshButton.disabled = false;
  }
}

function renderSearchResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = `
      <article>
        <span>Search</span>
        <h3>No results found</h3>
        <p>Try searching for sports, venues, or news.</p>
      </article>
    `;
    return;
  }

  searchResults.innerHTML = results.map((item) => `
    <article>
      <span>${item.type}</span>
      <h3>${item.title}</h3>
      <p>${shortText(item.description, 190)}</p>
    </article>
  `).join("");
}

menuButton.addEventListener("click", showMenu);
closeMenu.addEventListener("click", hideMenu);
overlay.addEventListener("click", hideMenu);
refreshButton.addEventListener("click", loadSiteData);

document.querySelectorAll(".menu-drawer a").forEach((link) => {
  link.addEventListener("click", hideMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideMenu();
  }
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    return;
  }

  searchResults.innerHTML = "";

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    renderSearchResults(data.results || []);
  } catch (error) {
    searchResults.innerHTML = `
      <article>
        <span>Search</span>
        <h3>Search failed</h3>
        <p>Backend server is not responding.</p>
      </article>
    `;
  }
});

loadSiteData();
setInterval(loadSiteData, 60000);
