// For an introduction to the Search Results Page template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232512
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/searchResults/searchResults.html", {
        _lastSearch: "",
 
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // highlight matched title text
            WinJS.Namespace.define("searchResults", {
                markText: WinJS.Binding.converter(this._markText.bind(this))
            });

            // Get the ListView
            var lvSearchResults = document.getElementById("lvSearchResults").winControl;

            // Get the search query
            var queryText = options.searchDetails.queryText;
            this._lastSearch = queryText;

            // Get all of the notes
            var notesDataSource = new DataSources.FileDataSource("notes.json");
            notesDataSource.getAll().then(function(notes) {
                // Filter the results
                var filteredResults = [];
                for (var i = 0; i < notes.length; i++) {
                    var note = notes[i];
                    if (note.title.toLowerCase().indexOf(queryText.toLowerCase()) >= 0) {
                        filteredResults.push(note);
                    }
                }

                if (filteredResults.length) {
                    // Show results
                    document.getElementById("divNoResults").style.display = "none";

                    // Convert to List Data Source
                    var listResults = new WinJS.Binding.List(filteredResults);

                    // Bind to ListView
                    lvSearchResults.itemDataSource = listResults.dataSource;
                } else {
                    // Report no results
                    document.getElementById("divNoResults").style.display = "block";
                    var emptyList = new WinJS.Binding.List();
                    lvSearchResults.itemDataSource = emptyList.dataSource;
                }
            });
        },

        // This function colors the search term. 
        _markText: function (text) {
            var regex = new RegExp("(" + this._lastSearch + ")", "i");
            return text.replace(regex, "<mark>$1</mark>");
        }

    });
})();
