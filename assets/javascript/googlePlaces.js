var map;
    var infowindow;
    var request;
    var service;
    var markers = [];

    function myMapx() {

        //specify the map properties

        var center = new google.maps.LatLng(33.646131, -117.843041);
        var mapDiv = document.getElementById('googleMap');

        map = new google.maps.Map(mapDiv, {
            center: center,
            zoom: 12
        });


        request = {
            location: center,
            radius: 8047,
            types: ['gym']
        }
        infowindow = new google.maps.InfoWindow();

        service = new google.maps.places.PlacesService(map);


        service.nearbySearch(request, callback);

google.maps.event.addListener(map, 'rightclick', function(event) {
  map.setCenter(event.latLng)
  clearResults(markers)

  var request = {
    location: event.latLng,
    radius: 8047,
    types: ['gym']
  };
  service.nearbySearch(request, callback);
})

    }

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

    // // Try HTML5 geolocation.
    //         if (navigator.geolocation) {
    //           navigator.geolocation.getCurrentPosition(function(position) {
    //             var pos = {
    //               lat: position.coords.latitude,
    //               lng: position.coords.longitude
    //             };

    //             infoWindow.setPosition(pos);
    //             infoWindow.setContent('Location found.');
    //             infoWindow.open(map);
    //             map.setCenter(pos);
    //           }, function() {
    //             handleLocationError(true, infoWindow, map.getCenter());
    //           });
    //         } else {
    //           // Browser doesn't support Geolocation
    //           handleLocationError(false, infoWindow, map.getCenter());
    //         }
      

    //       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent(browserHasGeolocation ?
    //                               'Error: The Geolocation service failed.' :
    //                               'Error: Your browser doesn\'t support geolocation.');
    //         infoWindow.open(map);
    //       }