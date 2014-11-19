// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {lat: 47.6, lng: -122.3};
    var markers = [];

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            data.forEach(function(cam) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(cam.location.latitude),
                        lng: Number(cam.location.longitude)
                    },
                    map: map,
                    cam: cam
                });

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<h2>' + cam.cameralabel + '</h2>';
                    html += '<img src="' + cam.imageurl.url + '"/>';
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });

                markers.push(marker);
            });
        })
        .fail(function(err) {
            console.log(err);
        })
        .always(function() {
            $('#ajax-loader').fadeOut();
        });

    $('#search').bind('search keyup', function() {
        $.each(markers, function() {
            
        });
    });
});