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
            Indexer.query(queryText).done(function (queryResults) {
                if (queryResults.length) {
                    // Show results
                    document.getElementById("divNoResults").style.display = "none";

                    // Get all of the notes and filter against search results
                    var filteredNotes = [];
                    MyApp.notesDataSource.getAll().done(function (notes) {
                        for (var i = 0; i < notes.length; i++) {
                            var note = notes[i];
                            if (queryResults.indexOf(note.key) >= 0) {
                                filteredNotes.push(note.data);
                            }
                        }
                        // Convert to List Data Source
                        var listResults = new WinJS.Binding.List(filteredNotes);

                        // Bind to ListView
                        lvSearchResults.itemDataSource = listResults.dataSource;
                    });
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
