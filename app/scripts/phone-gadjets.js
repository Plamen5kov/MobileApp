(function () {
    window.phoneGadjets = kendo.observable({

        getMeterInfo: function () {
            window.shake = {},
            watchId = null,
            options = {
                frequency: 100
            },
            previousAcceleration = {
                x: null,
                y: null,
                z: null
            },
            shakeCallBack = null;

            // Start watching the accelerometer for a shake gesture
            shake.startWatch = function (onShake) {
                if (onShake) {
                    shakeCallBack = onShake;
                }
                watchId = navigator.accelerometer.watchAcceleration(getAccelerationSnapshot, handleError, options);
            };

            // Stop watching the accelerometer for a shake gesture
            shake.stopWatch = function () {
                if (watchId !== null) {
                    navigator.accelerometer.clearWatch(watchId);
                    watchId = null;
                }
            };

            // Gets the current acceleration snapshot from the last accelerometer watch
            function getAccelerationSnapshot() {
                navigator.accelerometer.getCurrentAcceleration(assessCurrentAcceleration, handleError);
            }

            // Assess the current acceleration parameters to determine a shake
            function assessCurrentAcceleration(acceleration) {
                var accelerationChange = {};
                if (previousAcceleration.x !== null) {
                    accelerationChange.x = Math.abs(previousAcceleration.x, acceleration.x);
                    accelerationChange.y = Math.abs(previousAcceleration.y, acceleration.y);
                    accelerationChange.z = Math.abs(previousAcceleration.z, acceleration.z);
                }
                if (accelerationChange.x > 8 || accelerationChange.y > 8) {
                    // Shake detected
                    var msg = '';
                    if (accelerationChange.x > 8) {
                        msg = "you'll drop me!";
                    }
                    if (accelerationChange.z > 8) {
                        msg = "i'm falling!";
                    }
                    
                    if (typeof (shakeCallBack) === "function") {
                        shakeCallBack(msg);
                    }
                    shake.stopWatch();
                    setTimeout(shake.startWatch, 1000);
                    previousAcceleration = {
                        x: null,
                        y: null,
                        z: null
                    }
                } else {
                    previousAcceleration = {
                        x: acceleration.x,
                        y: acceleration.y,
                        z: acceleration.z
                    }
                }
            }

            // Handle errors here
            function handleError() {}

            function shaking(msg) {
                navigator.notification.alert(msg);
            }

            shake.startWatch(shaking);
        },

        stopWather: function () {
            shake.stopWatch();
        },

        getCompasHeading: function () {
            function direction() {
                function onSuccess(heading) {
                    var magnetHeading = heading.magneticHeading;
                    var files = [];

                    if (magnetHeading >= 45 && magnetHeading < 135) {
                        files.push("east");
                    } else if (magnetHeading >= 135 && magnetHeading < 225) {
                        files.push("south");
                    } else if (magnetHeading >= 225 && magnetHeading < 315) {
                        files.push("west");
                    } else {
                        files.push("north");
                    }

                    $('#compas').kendoMobileListView({
                        dataSource: files,
                        template: '<p> #: data # </p>'
                    });
                };

                function onError(error) {
                    alert('CompassError: ' + error.code);
                };

                navigator.compass.getCurrentHeading(onSuccess, onError);
            }

            setInterval(direction, 200);
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
            navigator.device.capture.captureVideo(captureSuccess, captureError, {
                limit: 1
            });

        }
    });
})();