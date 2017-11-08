var map;
    var infowindow;
    var request;
    var service;
    var markers = [];
    var lat = -33.865936;
    var lng = 151.216271;

//initial map function:
    function myMapx() {

        //specify the map location
        var center = new google.maps.LatLng(lat, lng);
        //create map and add it to the page
        var mapDiv = document.getElementById('googleMap');
        //set the map placement and zoom
        map = new google.maps.Map(mapDiv, {
            center: center,
            zoom: 12
        });

  //search for gyms within 5 miles or 8047 meters
        request = {
            location: center,
            radius: 8047,
            types: ['gym']
        }
        infowindow = new google.maps.InfoWindow();

        service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, callback);

//listener to recenter map if right clicked
google.maps.event.addListener(map, 'rightclick', function(event) {
  map.setCenter(event.latLng)
  //clear existing markers
  clearResults(markers)

            //find gyms within listener ------------------.
              request = {
                location: event.latLng,
                radius: 8047,
                types: ['gym']
              };
              service.nearbySearch(request, callback);
            //END find gyms withing addListener

})  //END Listner---------

    }    //END initial map function




//hmmmm begin -------------------

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                markers.push(createMarker(results[i]));
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        //add info tag to marker if clicked
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
        return marker;
    }

    function clearResults(markers) {
      for (var m in markers) {
        markers[m].setMap(null)}
      }
      markers = []
    

    // hmmmmm end --------------



    // google.maps.event.addDomListener(window, 'load', myMapx());

    /*
    //add a marker
      var marker = new google.maps.Marker({position:mapProp.center,
      // icon:'pinkball.png'
      // animation: google.maps.Animation.BOUNCE
      });
      marker.setMap(map);
    //add an infowindow
      var infowindow = new google.maps.InfoWindow({
        content: "I'm an infowindow!  Below me is a marker!"
      });
    // Zoom to 9 when clicking on marker
    google.maps.event.addListener(marker,'mouseover',function() {
      map.setCenter(marker.getPosition());
      //add infowindow when cliked
      infowindow.open(map,marker);
      });
    google.maps.event.addListener(marker,'dblclick',function() {
      map.setZoom(9);
      map.setCenter(marker.getPosition());
      //add infowindow when cliked
      infowindow.open(map,marker);
      });
     */
    // var infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };

                infowindow.setPosition(pos);
                infowindow.setContent('Location found.');
                infowindow.open(map);
                map.setCenter(pos);
            //find gyms within listener ------------------.
              var request = {
                location: pos,
                radius: 8047,
                types: ['gym']
              };
              service.nearbySearch(request, callback);
            //END find gyms withing addListener


              }, function() {
                handleLocationError(true, infowindow, map.getCenter());
              });
            


            } else {
              // Browser doesn't support Geolocation
              handleLocationError(false, infowindow, map.getCenter());
            }
      

          function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infowindow.setPosition(pos);
            infowindow.setContent(browserHasGeolocation ?
                                  'Error: The Geolocation service failed.' :
                                  'Error: Your browser doesn\'t support geolocation.');
            infowindow.open(map);

          }
    // END HTML5 geolocation....