(function () {

    var everlive = new Everlive("sz0Zz1ZApYIzWbTh");
    var images = everlive.data("PictureInfo");

    var loadPhoto = function () {
        images.get()
            .then(function (data) {
                    console.log(data);
                    var files = [];
                    data.result.forEach(function (image) {
                        files.push(image.Img.Uri);
                    });

                    $('#images').kendoMobileListView({
                        dataSource: files,
                        template: '<img src="#: data #">'
                    });
                },
                function (error) {
                    console.log(error);
                })
        //everlive.Files.get()

        //.then(function (data) {
        //    var files = [];
        //    data.result.forEach(function (image) {
        //        files.push(image.Uri);
        //    });

        //    $('#images').kendoMobileListView({
        //        dataSource: files,
        //        template: '<img src="#: data #">'
        //    });
        //});
    };

    //if there are any photos already in the db ... show them immediatly
    loadPhoto();

    var geolocationError = function (data) {
        console.log('---some err---');
        console.log(data);
    };

    var geolocationOptions = {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    }

    function createEverliveObject(data) {
        console.log('FINAL DATA TO SAVE IN EVERLIVE...');
        console.log(data.img);
        everlive.Files.create({ //if you took the pic...create a file in everlive
            Filename: Math.random().toString(36).substring(2, 15) + ".jpg", //give it random name
            ContentType: "image/jpg", // config
            base64: data //more config
        })
            .then(loadPhoto);
    }

    window.listView = kendo.observable({
        addImage: function () {

            var location = {};

            var picSuccess = function (data) {

                window.everlive.Files.create({ //if you took the pic...create a file in everlive
                        Filename: Math.random().toString(36).substring(2, 15) + ".jpg", //give it random name
                        ContentType: "image/jpg", // config
                        base64: data //more config
                    },
                    function (picData) {
                        window.everlive.data('PictureInfo').create({
                                'Img': picData.result,
                                'Location': location
                            },
                            function (data) {
                                console.log(data);
                            }, error);
                    }, error);

            };

            var error = function () {
                navigator.notification.alert("Unfortunately we could not add the image");
            };

            var picConfig = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 400,
                targetWidth: 400
            };

            var geoConfig = {
                maximumAge: 3000,
                timeout: 5000,
                enableHighAccuracy: true
            };

            var geoSuccess = function (data) {
                location = {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                };

                navigator.camera.getPicture(picSuccess, error, picConfig);
            };

            navigator.geolocation.getCurrentPosition(geoSuccess, error, geoConfig);


            //var success = function (data) {
            //    picInfo.img = data;
            //    console.log('---added picture to picInfo ...');
            //    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);
            //};

            //var geolocationSuccess = function (data) {
            //    console.log('---added latutude and longitude...');
            //    picInfo.coords = {};
            //    picInfo.coords.latitude = data.coords.latitude;
            //    picInfo.coords.longitude = data.coords.longitude;
            //    //picInfo.image = data;

            //    images.create(picInfo, function (data) { console.log("Pictire object added!"); }, function (error) { "No object created" });
            //    loadPhoto();
            //    //createEverliveObject(picInfo);
            //};

            //var error = function () {
            //    navigator.notification.alert("Unfortunately we could not add the image");
            //};

            //var config = {
            //    destinationType: Camera.DestinationType.DATA_URL,
            //    targetHeight: 400,
            //    targetWidth: 400
            //};

            //navigator.camera.getPicture(success, error, config);
        },

        loadPhotos: loadPhoto,
    });

    document.addEventListener("deviceready", function () {
        var app = new kendo.mobile.Application(document.body, {
            skin: "flat",
            layout: "tabstrip-layout",
            initial: "#initialView"
        });
    });

    document.addEventListener("offline", onOffline, false);

    function onOffline() {
        navigator.notification.alert("Our app needs to have THE NET!!!");
        navigator.notification.vibrate(200);
    }

    document.addEventListener("online", onOnfline, false);

    function onOnfline() {
        navigator.notification.alert("WE HAZ THE NET!!!");
        navigator.notification.beep(1);
    }


}());