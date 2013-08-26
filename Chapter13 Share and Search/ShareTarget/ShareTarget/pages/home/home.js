(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {
            var lvNotes = document.getElementById("lvNotes").winControl;

            // Create data source and bind to ListView
            lvNotes.itemDataSource = MyApp.notesDataSource;
        }
    });
})();
