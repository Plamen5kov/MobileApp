(function () {
    window.contactsModel = kendo.observable({
        getContacts: function () {
            function onSuccess(contacts) {
                //navigator.notification.alert('Found ' + contacts[3].name.familyName  + '\n' +
                //                          'Found ' + contacts[3].name.givenName  + '\n' +
                //                         'Found ' + contacts[3].phoneNumbers[0]  + '\n');
                //$('#contacts').innerText(contacts[3].name);

                var files = [];
                for (var i = 0; i < contacts.length; i++) {
                  
                    var contactObject = {};
                    contactObject.name = contacts[i]['name']['givenName'];
                    contactObject.number = contacts[i]['phoneNumbers'][0]['value'];
                    files.push(contactObject);
                }
                
                //for(var prop in contacts[0]['phoneNumbers'][0]['value']){
                    //navigator.notification.alert('number: ' + contacts[0]['phoneNumbers'][0]['value']);  
                //}
                  
                $('#contacts').kendoMobileListView({
                    dataSource: files,
                    template: '<li> #: data.name # - #: data.number #</li>'
                });
            };

            function onError(contactError) {
                alert('onError!');
            };

            // find all contacts with 'Bob' in any name field
            var options = new ContactFindOptions();
            var searchContact = $('#contact-input')[0].value;
            options.filter = searchContact || "";
            options.multiple = true;
            var fields = ["name","phoneNumbers"];
            navigator.contacts.find(fields, onSuccess, onError, options);
        }
    });
})();