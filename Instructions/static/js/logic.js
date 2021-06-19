let weeklyEarthquakeQueryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let dailyEarthquakeQueryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(dailyEarthquakeQueryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data.features);
});

// Declare global variables: 
// let maxDepth = 0;
// let minDepth = 0;

/**
 * 
 * @param {Object} earthquakeData - earthquake data features
 */
function createFeatures(earthquakeData) {
  const EARTHQUAKE_DEPTH_IDX = 2;

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    let earthquakePlace = feature.properties.place;
    let earthquakeTime = new Date(feature.properties.time);
    let earthquakeDepth = +feature.geometry.coordinates[EARTHQUAKE_DEPTH_IDX];
    let earthquakeMag = +feature.properties.mag;

    // layer.bindPopup("<h3>" + feature.properties.place +
    //   "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    layer.bindPopup("<h3>" + earthquakePlace +
      "</h3><hr>" + "<b>Time: </b>" + earthquakeTime + 
      "<br> <b>Magnitude: </b>" + earthquakeMag + 
      "<br> <b>Depth: </b>" + earthquakeDepth);

    // Find the max and min depth: 
    // Answer: minDepth = -2, maxDepth = 602.48
    // if (earthquakeDepth > 0 && earthquakeDepth > maxDepth) {
    //   maxDepth = earthquakeDepth;
    // } else if (earthquakeDepth < 0 && earthquakeDepth < minDepth) {
    //   minDepth = earthquakeDepth;
    // }
    // console.log(`Place = ${earthquakePlace}, Time = ${earthquakeTime}, Depth = ${earthquakeDepth}`);
    // console.log( `minDepth = ${minDepth}, maxDepth = ${maxDepth}`);

  } // end onEachFeature()


  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    
    // pointToLayer: function(feature, latlng) {
    //   return new L.circle(latlng,
    //     { 
    //       radius: getCircleRadius (feature.properties.mag),
    //       fillColor: getCircleColor(feature.geometry.coordinates[2]),
    //       fillOpacity: 0.5,
    //       color: "black",
    //       stroke: true,
    //       weight: 0.7
    //     }); 
    // }, // end function(feature, latlng)

    onEachFeature: onEachFeature
  }); // end var earthquakes

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);

} // end createFeatures()

/**
 * 
 * @param {Object} earthquakes 
 */
function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var baseLightMapLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    // id: "mapbox/streets-v11", // colored map
    id: "mapbox/light-v10", // black-and-white map
    accessToken: API_KEY
  });

  // var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "dark-v10",
  //   accessToken: API_KEY
  // });

  // Define a baseMaps object to hold our base layers
  // var baseMaps = {
  //   "Street Map": streetmap,
  //   "Dark Map": darkmap
  // };

  // Create overlay object to hold our overlay layer
  // var overlayMaps = {
  //   Earthquakes: earthquakes
  // };

  // Create our map, giving it the base stateMap layer and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [baseLightMapLayer, earthquakes]
  });

  // Create a legend that will provide context for the map data.
  let mapLegend = L.control ({
    position: "bottomright"
  });

  mapLegend.onAdd = function(earthquakeMap) {
    let divTagForLegend = L.DomUtil.create("div", "map-legend"),
      colorGradients = ["#64F58D", "#9CFFD9", "#B2ABF2", "#F07167", "#C2E812", "#FE2036"];
      legendLabels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];

    // Create the map legend object
    for (let i = 0; i < colorGradients.length; i++) {
      divTagForLegend.innerHTML += 
        '<i style="background:' + colorGradients[i] + '"></i> ' + 
        legendLabels[i] + '<br>';
    }

    return divTagForLegend;
  }; // end magLegend.onAdd 

  mapLegend.addTo(myMap);
    
} // end CreateMap()


  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(myMap);

// helper functions: 
  // QuakeDepth is the 3rd coords
  // Ref: https://coolors.co/ to generate color palette
  // 
  function getCircleColor(quakeDepth) {

    if (quakeDepth > -10 && quakeDepth <= 10) {
      return "#64F58D"; //Spring green
    } else if (quakeDepth > 10 && quakeDepth <= 30) {
      return "#9CFFD9"; // light green
    } else if (quakeDepth > 30 && quakeDepth <= 50) {
      return "#B2ABF2"; // purple
    } else if (quakeDepth > 50 && quakeDepth <= 70) {
      return "#F07167"; //bright peach
    } else if (quakeDepth > 70 && quakeDepth <= 90) {
      return "#C2E812"; // bitter lemon color
    } else if (quakeDepth > 90 ) {
      return "#FE2036"; //bring red big numbers
    }

    // if (quakeDepth >= -10 && quakeDepth <= 10) {
    //   return "#64F58D"; //Spring green
    // } else if (quakeDepth < 40) {
    //   return "#39A0ED"; // light cyan
    // } else if (quakeDepth < 60) {
    //   return "#9CFFD9"; // light green
    // } else if (quakeDepth < 80) {
    // return "#3AA7A3"; // verdigris (blue/greenish)
    // } else if (quakeDepth < 100) {
    //   return "#B2ABF2"; // purple
    // } else if (quakeDepth < 200) {
    //   return "#0081A7"; // darker blue
    // } else if (quakeDepth < 300) {
    //   return "#F07167"; //bright peach
    // } else if (quakeDepth < 400) {
    //   return "#8DF7AD";
    // } else if (quakeDepth < 500) {
    //   return "#C2E812"; // bitter lemon color
    // } else if (quakeDepth < 600) {
    //   return "#F679A7"; // bright peach
    // } else {
    //   return "#FE2036"; //bring red big numbers
    // }
  };

  function getCircleRadius(quakeMagnitude) {
    return quakeMagnitude * 1000; 
  }


