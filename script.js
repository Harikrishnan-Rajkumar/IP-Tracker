document.addEventListener("DOMContentLoaded", () => {
  let searchBtnEl = document.getElementById("searchBtn");
  let ipAddressInputEl = document.getElementById("ipAddressInput");
  let ipAddressEl = document.getElementById("ipAddress");
  let ispEl = document.getElementById("isp");
  let locationEl = document.getElementById("location");
  let timezoneEl = document.getElementById("timezone");
  let locationIcon = document.querySelector(".leaflet-marker-icon");

  let latitude = 40.6782;
  let longitude = -73.9442;
  const customIcon = L.icon({
    iconUrl: 'images/icon-location.svg', // Example Base64 encoded SVG
    iconAnchor: [23, 28],
    popupAnchor: [0, -56]
  });
  var map = L.map('map', {      
    attributionControl: false
  }).setView([latitude, longitude], 13);

  let marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  function updateMap(latitude, longitude) {
    map.setView([latitude, longitude], 13);
    marker.setLatLng([latitude, longitude]);
    marker.openPopup(); 
  }   

  function getIpFromDomain(ip) {
    const url = `https://cloudflare-dns.com/dns-query?name=${ip}&type=A`;
    fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/dns-json' }
    })
      .then(response => response.json())
      .then(data => {
        if (data.Answer && data.Answer.length > 0) {
          let ips = data.Answer.map(entry => entry.data);
          let validIps = ips.filter(ip => /^\d{1,3}(\.\d{1,3}){3}$/.test(ip));
          console.log(`IP Addresses for ${ip}:`, validIps[0]);
          getGeoData(validIps[0]);
        } else {
          console.log('No IP address found');
          alert("Please enter a valid Domain Name or IP Address");
        }
      })
      .catch(error => console.error('Error fetching IP:', error));
  }

  function getGeoData(ip) {
    var api_key = "at_Mwvqv7B9bVwu6nBmXch72uKPecvJ6";
    
    $.ajax({
      url: `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ip}`,
      success: function(data) {
        ipAddressEl.textContent = data.ip || "IP Address not found";
        ispEl.textContent = data.isp || data.as.name;
        locationEl.textContent = `${data.location.city}, ${data.location.country}` || "Location not found";
        timezoneEl.textContent = "UTC" + data.location.timezone;
        
        let newlatitude = parseFloat(data.location.lat);
        let newlongitude = parseFloat(data.location.lng);
        updateMap(newlatitude, newlongitude);
      },
      error: function() {
        console.error('Error fetching geo data');
      }
    });
  }

  function search(){
    var ip = ipAddressInputEl.value.trim();
    if (/[a-zA-Z]/.test(ip)){
      getIpFromDomain(ip);
    } else if (/\b\d{1,3}(\.\d{1,3}){3}\b/.test(ip)){
      getGeoData(ip);
    } else {
      alert("Enter a valid IP address or domain name");
    }
  }

  searchBtnEl.addEventListener("click", search);
  
  ipAddressInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      search();
    }
  });  
});
  