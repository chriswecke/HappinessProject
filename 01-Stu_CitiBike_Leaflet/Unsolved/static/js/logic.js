 var newYorkCoords = [40.73, -74.0059];
 var mapZoomLevel = 12;

// Create the createMap function


function createMap(){
 // var tileUrl = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png';
 // var mapTiles = L.tileLayer(tileUrl),
 // magnifiedTiles = L.tileLayer(tileUrl);

  var map = L.map('map', {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [mapTiles]
  });

  var dataLayer = getData(map);
  var magnifiedDataLayer = cloneLayer(dataLayer);

  var magnifyingGlass = L.magnifyingGlass({
    layers: [magnifiedTiles, magnifiedDataLayer]
  }).addTo(map);    
};

  // Create the tile layer that will be the background of our map
  var mapTiles = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

var url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
d3.json(url, function (response) {
  // curious about what tree species are in the dataset, so I'll start with an empty array
  var trees = {}

  for (var i = 0; i < response.length; i++) {
      var species = response[i].spc_common
      var latitude = response[i].latitude
      var longitude = response[i].longitude;


var bikeStations = [];

for (var i = 0; i < cities.length; i++) {
  // loop through the cities array, create a new marker, push it to the bikeStations array
  bikeStations.push(
    L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
  );
}

// Add all the bikeStations to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var cityLayer = L.layerGroup(bikeStations);

// Define variables for our tile layers
var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});




  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    Light: light,
    Dark: dark
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    Cities: cityLayer
  };

  // Create the map object with options
  

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Create the createMarkers function

  // Pull the "stations" property off of response.data

  // Initialize an array to hold bike markers

  // Loop through the stations array
    // For each station, create a marker and bind a popup with the station's name

    // Add the marker to the bikeMarkers array

  // Create a layer group made from the bike markers array, pass it into the createMap function


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
