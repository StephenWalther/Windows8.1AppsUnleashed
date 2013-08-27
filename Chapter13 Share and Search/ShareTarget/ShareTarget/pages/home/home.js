(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {
            var lvNotes = document.getElementById("lvNotes").winControl;

            // Create data source and bind to ListView
            lvNotes.itemDataSource = MyApp.notesDataSource;

            // Listen for changes to notes
            Windows.Storage.ApplicationData.current.addEventListener("datachanged", function () {
                console.log("reloading notes");
                var notesDataSource = new DataSources.FileDataSource("notes.json");
                lvNotes.itemDataSource = notesDataSource;
            });

        }
    });
})();
