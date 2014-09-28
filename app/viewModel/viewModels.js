(function ($, console, doc) {
    var announcementViewModel,
    	cardsViewModel,
        storesListViewModel;


    announcementViewModel = kendo.observable({
        announcements: [],

        load: function (announcements) {
            var that = this;
            that.set("announcements", announcements);
        }
    });

    cardsViewModel = kendo.observable({
        cards: [],
        _cardNumbers: {},

        loadFromLocalStorage: function () {
            var that = this;
            var i;
            var cards = [];

            if (window.localStorage.getItem("cards") !== null) {
                cards = JSON.parse(window.localStorage.getItem("cards"));
            }

            for (i = 0; i < cards.length; i += 1) {
                this._cardNumbers[cards[i].cardNumber] = i;
            }

            that.set("cards", cards);
            that.cards.bind("change", that.writeIntoLocalStorage);
        },

        writeIntoLocalStorage: function (e) {
            var dataToWrite = JSON.stringify(cardsViewModel.cards);
            window.localStorage.setItem("cards", dataToWrite);
        },

        addCards: function () {

        }
    });
    $.extend(window, {


        announcementViewModel: announcementViewModel,
        cardsViewModel: cardsViewModel, //map

    });

})(jQuery, console, document);