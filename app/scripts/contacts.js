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
                    //navigator.notification.alert('GivenName ' + contacts[i]['name']['givenName']);
                    //$('#contacts').append('<li>' + contacts[i]['name']['givenName'] + '</li>');
                    //$('#contacts').append('<li>' + contacts[i]['name']['formatted'] + '</li>');
                    files.push(contacts[i]['name']['givenName']);
                }
                
                $('#contacts').kendoMobileListView({
                    dataSource: files,
                    template: '<li> #: data #</li>'
                });
            };

            function onError(contactError) {
                alert('onError!');
            };

            // find all contacts with 'Bob' in any name field
            var options = new ContactFindOptions();
            options.filter = "kaka";
            options.multiple = true;
            var fields = ["displayName", "name", "nickname", "id", "phoneNumbers"];
            navigator.contacts.find(fields, onSuccess, onError, options);
        }
    });
})();