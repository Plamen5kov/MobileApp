(function () {
    window.userForm = kendo.observable({
        login: function () {
            //take values from form
            // send them to form
            var username = $('#username-input').val();
            var password = $('#password-input').val();


            everlive.Users.login(username, // username
                password, // password
                function (data) {
                    //navigator.notification.alert("Logged in");
                    app.navigate('views/add-pictures.html');
                },
                function (error) {
                    alert(JSON.stringify(error));
                });
        },
        logout: function () {
            app.navigate('views/userForm.html');
            return everlive.Users.logout();
        }
    });
})();