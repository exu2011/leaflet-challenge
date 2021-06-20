# leaflet-challenge

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!
The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

Your first task is to visualize an earthquake data set.
Get your data set

Import & Visualize the Data
Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.
Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.
HINT the depth of the earth can be found as the third coordinate for each earthquake.
Include popups that provide additional information about the earthquake when a marker is clicked.
Create a legend that will provide context for your map data.
Your visualization should look something like the map above.
The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates.
In this step we are going to..

Plot a second data set on our map.
Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.
Add layer controls to our map.

1.First define all-week earthquake url and all-day earthquake 
2. Perform a GET request to the query URL
3. use d3.json(dailyEarthquakeQueryUrl).then(function(data) {
4. Once we get a response, send the data.features object to the createFeatures function
5. Declare global variables: 

6. Define a function we want to run once for each feature in the features array
7. Give each feature a popup describing the place and time of the earthquake

8.  Create a GeoJSON layer containing the features array on the earthquakeData object
9.  Run the onEachFeature function once for each piece of data in the array

10.  return new L.circle(latlng,
11.  Sending our earthquakes layer to the createMap function
12. Define streetmap and darkmap layers

13.  Create our map, giving it the base stateMap layer and earthquakes layers to display on load
14.  Create a legend that will provide context for the map data. Ref: https://leafletjs.com/examples/choropleth/
15. Create the map legend object, helper functions: 
16. QuakeDepth is the 3rd coords  Ref: https://coolors.co/ to generate color palette
17. the circles on the map, unfortunately, do not change accordingly when you resize the map windown.
 

