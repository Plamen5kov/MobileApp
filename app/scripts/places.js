var markers = [];
var images = everlive.data("PictureInfo");
var loadLocation = function () {
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
                url: 'http://maps.google.com/maps/api/geocode/json?latlng=42.6509269,23.3794841&sensor=false',
                contentType: 'application/json'
            })
            return address;
        },
        function (error) {
            console.log(error);
        })
        .then(function (data) {
            console.log(data);
            markers.push({
                "location": [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng],
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
};

function createMap() {
    $("#map").kendoMap({
        center: [40, 25],
        zoom: 6,
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
        }],
        markers: markers
    });
}

$(document).ready(loadLocation());

//var markers = [];
//var images = everlive.data("PictureInfo");
////var loadLocation = function () {
////    images.get()
////        .then(function (data) {
////            data.result.forEach(function (image) {
////                markers.push({
////                    "location": [image.Location.latitude, image.Location.longitude],
////                    "shape": "pinTarget",
////                    "tooltip": {content: ""}
////                });
////            });
////            console.log(markers);

////        },
////            function (error) {
////                console.log(error);
////            })
////};

//function createMap() {
//    //loadLocation();
//    $("#map").kendoMap({
//        center: [40, 25],
//        zoom: 6,
//        layers: [{
//            type: "tile",
//            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"
//        }]
//    });
//}

//$(document).ready(createMap);