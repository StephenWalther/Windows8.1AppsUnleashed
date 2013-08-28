(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {
            var lvNotes = document.getElementById("lvNotes").winControl;

            // Create data source and bind to ListView
            lvNotes.itemDataSource = MyApp.notesDataSource;

            // Listen for changes to notes
            Windows.Storage.ApplicationData.current.addEventListener("datachanged", function () {
                lvNotes.itemDataSource.reload();
            });



            // Listen for search queries
            var search = document.getElementById("search").winControl;
            search.addEventListener("querysubmitted", function (e) {
                WinJS.Navigation.navigate("/pages/searchResults/searchResults.html", { searchDetails: e.detail })
            });



            // Handle requests for search suggestions
            search.addEventListener("suggestionsrequested",  function (e) {
                var queryText = e.detail.queryText;
                var searchSuggestions = e.detail.searchSuggestionCollection;

                // Needed because we are async
                e.detail.setPromise(
                    // Get all of the notes
                    MyApp.notesDataSource.getAll().then(function (notes) {
                        // Get matching results
                        var MAX_RESULTS = 3;
                        for (var i = 0; i < notes.length; i++) {
                            var note = notes[i];
                            if (note.title.toLowerCase().indexOf(queryText.toLowerCase()) >= 0) {
                                searchSuggestions.appendQuerySuggestion(note.title);
                            }
                            if (searchSuggestions.size >= MAX_RESULTS) {
                                break;
                            }
                        }
                    })

                );
            });



        }
    });
})();
