(function () {

    window.everlive = new Everlive("sz0Zz1ZApYIzWbTh");
    
    //document.addEventListener("deviceready", function () {
    //    navigator.splashscreen.hide();

    //            $('#images').kendoMobileListView({
    //                dataSource: files,
    //                template: '<img src="#: data #">'
    //            });
    //        },
    //            function (error) {
    //                console.log(error);
    //            })
    //};

    //if there are any photos already in the db ... show them immediatly
   
    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();
        
        document.addEventListener("backbutton", onButtonPressed, false);

        window.app = new kendo.mobile.Application(document.body, {
            skin: "flat",
            layout: "login-layout",
            initial: "#login-view"
        });
    });

    function onButtonPressed() {
        location.reload();
    }

    document.addEventListener("offline", onOffline, false);

    function onOffline() {
        navigator.notification.alert("Our app needs to have THE NET!!!");
        navigator.notification.vibrate(200);
    }

    document.addEventListener("online", onOnfline, false);

    function onOnfline() {
        navigator.notification.beep(1);
    }


}());