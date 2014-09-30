(function () {
    document.addEventListener("deviceready", function () {
        var markers = [];
        var images = everlive.data("PictureInfo");
        var currentPosition = {};

        var loadLocation = function () {
            setTimeout(
                function(){
                    function updateCoordinate(callback) {
                        navigator.geolocation.getCurrentPosition(
                          function (position) {
                              var returnValue = {
                                  latitude: position.coords.latitude,
                                  longitude: position.coords.longitude
                              }
                              // and here you call the callback with whatever
                              // data you need to return as a parameter.
                              callback(returnValue);
                          }
                        ),
                        errorMessage,
                        geoConfig
                    }

                    updateCoordinate(function (position) {
                        currentPosition = position;
                    });

                    function errorMessage(error) {
                        console.log('navigation error: ' + error);
                    }

                    var geoConfig = {
                        enableHighAccuracy: true
                    };

                    images.get()
                        .then(function (data) {
                            data.result.forEach(function (image) {
                                markers.push({
                                    "location": [image.Location.latitude, image.Location.longitude],
                                    "shape": "pinTarget",
                                    "tooltip": {
                                        "content": image.Address || ""
                                    }
                                });
                            });
                            console.log(markers);
                        },
                            function (error) {
                                console.log(error);
                            })
                        .then(function () {
                            var address = $.ajax({
                                type: 'GET',
                                url: 'http://maps.google.com/maps/api/geocode/json?latlng=' + currentPosition.latitude + ',' + currentPosition.longitude + '&sensor=false',
                                contentType: 'application/json'
                            })
                            return address;
                        },
                        function (error) {
                            console.log(error);
                        })
                        .then(function (data) {
                            var dataResult = {};
                            dataResult = data;

                            console.log(data.results[0].formatted_address);
                            if (!data.results[0]) {
                                location.reload();
                            };

                            console.log(data);

                            markers.push({
                                "location": [currentPosition.latitude, currentPosition.longitude],
                                "shape": "myStyle",
                                "tooltip": {
                                    "content": data.results[0].formatted_address || ""
                                }
                            });
                        }, function (error) {
                            console.log(error);
                        })
                        .then(function () {
                            createMap();
                        },
                        function (error) {
                            console.log(error);
                        });
                }, 5000);
        };
         
        function createMap() {
            $("#map").kendoMap({
                center: [currentPosition.latitude, currentPosition.longitude],
                zoom: 14,
                layers: [{
                    type: "tile",
                    urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
                }],
                markers: markers
            });
        }

        $(document).ready(loadLocation());

    });
}())