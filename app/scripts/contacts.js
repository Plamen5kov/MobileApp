(function () {

    window.contactsTouch = {
        swipe: function (e) {
            // TODO: e.preventDeafault/stopPropagation 
            console.log("swipe " + e.direction);
            if(e.direction == "left") {
                app.navigate('views/add-pictures.html');
            }
            if(e.direction == "right") {
                app.navigate("views/phone-gadjets.html");
            }
        }
    }

    window.contactsModel = kendo.observable({
        getContacts: function () {
            function onSuccess(contacts) {
                
                var files = [];
                for (var i = 0; i < contacts.length; i++) {

                    var contactObject = {};
                    contactObject.name = contacts[i]['name']['givenName'];
                    contactObject.number = contacts[i]['phoneNumbers'][0]['value'];
                    files.push(contactObject);
                }
                
                $('#contacts').kendoMobileListView({
                    dataSource: files,
                    template: '<li> #: data.name # - #: data.number #</li>'
                });
            };

            function onError(contactError) {
                alert('onError!');
            };

            var options = new ContactFindOptions();
            var searchContact = $('#contact-input')[0].value;
            options.filter = searchContact || "";
            options.multiple = true;
            var fields = ["name", "phoneNumbers"];
            navigator.contacts.find(fields, onSuccess, onError, options);
        }
    });
})();