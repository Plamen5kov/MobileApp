(function () {
    window.phoneGadjets = kendo.observable({
        getMeterInfo: function () {
            function onSuccess(acceleration) {
                var accelerate = {};
                accelerate.X = acceleration.x;
                accelerate.Y = acceleration.y;
                accelerate.Z = acceleration.z;
                accelerate.timeStrap = acceleration.timestamp;

                var files = [];
                files.push(accelerate);

                $('#acel').kendoMobileListView({
                    dataSource: files,
                    template: '<p> #: data.X # </p> <p> #: data.Y # </p> <p> #: data.Z # </p> '
                });
            };

            function onError() {
                alert('onError!');
            };

            navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
        },

        getCompasHeading: function () {
            function onSuccess(heading) {
                var magnetHeading = heading.magneticHeading;
                var files = [];
                files.push(magnetHeading);
                console.log(heading);

                $('#compas').kendoMobileListView({
                    dataSource: files,
                    template: '<p> #: data # </p>'
                });
            };

            function onError(error) {
                alert('CompassError: ' + error.code);
            };

            navigator.compass.getCurrentHeading(onSuccess, onError);
        },

        record: function () {
            // capture callback
            var captureSuccess = function (mediaFiles) {
                var i, path, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    path = mediaFiles[i].fullPath;
                    // do something interesting with the file
                    var files = [];
                    files.push(path);

                    $('#record').kendoMobileListView({
                        dataSource: files,
                        template: '<p> #: data # </p>'
                    });
                }
            };

            // capture error callback
            var captureError = function (error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            };

            // start video capture
            navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});

        }
    });
})();