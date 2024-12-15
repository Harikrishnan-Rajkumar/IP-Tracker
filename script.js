<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->

  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  <script src="script.js" defer></script>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <title>IP Tracker</title>

</head>
<body>
  <div class="wrapper">
    <div class="content">
      <div class="top-bg"></div>
      <div class="top-container">
        <div class="top-content">
          <h1 class="heading">IP Address Tracker</h1>
          <div class="search-container">
            <input id="ipAddressInput" type="text" placeholder="Search for any IP address or domain">
            <button id="searchBtn"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6"/></svg></button>
          </div>          
          <div class="info-container">
            <div class="info">
              <p class="info-title">IP ADDRESS</p>
              <div class="loading dot-falling"></div>
              <p class="info-content hide" id="ipAddress">8.8.8.8</p>
            </div>
            <div class="info">
              <p class="info-title">LOCATION</p>
              <div class="loading dot-falling"></div>
              <p class="info-content hide" id="location">Mountain View, US</p>
            </div>
            <div class="info">
              <p class="info-title">TIMEZONE</p>
              <div class="loading dot-falling"></div>
              <p class="info-content hide" id="timezone">UTC-08:00</p>
            </div>
            <div class="info info-last">
              <p class="info-title">ISP</p>
              <div class="loading dot-falling"></div>
              <p class="info-content hide" id="isp">Google LLC</p>
            </div>
          </div>
        </div>
      </div>
      <div class="map-container" id="map"></div>      
    </div>
  </div>
</body>
</html>
