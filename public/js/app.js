  // create route
  route = {};
  route.id = generateRouteId();
  route.points = [];
  route.toHtml = function() {
    var html = '';
    for(var i=0; i<this.points.length; i++) {
      html += 'Route ' + this.id;
      html += '<p>';
      html += 'Time: ' + this.points[i].time + '</br>';
      html += 'Latitude: ' + this.points[i].lat + '</br>';
      html += 'Longitude: ' + this.points[i].lon + '</br>';
      html += '</p>';
    }
    return html;
  };
  console.log(route);
  
  // current location is first point, righ now is fake
  var latlon = routeRadiatasGlorieta.pop();
  lat = latlon[1];
  lon = latlon[0];
  var routePoint = {
    'time': new Date().getTime(),
    'lat': lat,
    'lon': lon
  };
  route.points.push(routePoint);
  startMarker = new L.marker([lat, lon]);
  lastMarker = new L.marker([lat, lon]);
  
  // draw map
  var map = L.map('map').setView([lat, lon], 15);
  L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    id: 'examples.map-i875mjb7'
  }).addTo(map);
  
  map.addLayer(startMarker);
  
  var int = self.setInterval(function(){getLocation()}, 5000);
  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  function generateRouteId() {
    var id = new Date().getTime();
    id += Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return id;
  }

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    
    // fakes location with route
    var latlon = routeRadiatasGlorieta.pop();
    lat = latlon[1];
    lon = latlon[0];
    
    // Render route and marker
    var latLast = route.points[route.points.length - 1].lat;
    var lonLast = route.points[route.points.length - 1].lon;
    
    var pointA = new L.LatLng(latLast, lonLast);
    var pointB = new L.LatLng(lat, lon);
    var pointList = [pointA, pointB];

    var firstpolyline = new L.Polyline(pointList, {
      color: 'green',
      weight: 5,
      opacity: 0.8,
      smoothFactor: 1
    });
    firstpolyline.addTo(map);
    
    marker = new L.marker([lat, lon]);
    map.removeLayer(lastMarker);
    map.addLayer(marker);
    lastMarker = marker;
    map.panTo(new L.LatLng(lat, lon));
    
    // create route point and add to route
    var routePoint = {
      'time': new Date().getTime(),
      'lat': lat,
      'lon': lon
    };
    route.points.push(routePoint);
    
    // Send route to server would be here
    console.log(routePoint);
  }
