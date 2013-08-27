// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;


    // Expose notes data source
    var notesDataSource = new DataSources.FileDataSource("notes.json");
    WinJS.Namespace.define("MyApp", {
        notesDataSource: notesDataSource
    });



    app.addEventListener("activated", function (args) {

        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(
                function () {
                    if (nav.location) {
                        nav.history.current.initialPlaceholder = true;
                        return nav.navigate(nav.location, nav.state);
                    } else {
                        return nav.navigate(Application.navigator.home);
                    }
                }).then(function () {
                    var lvNotes = document.getElementById("lvNotes").winControl;

                    // Wire-up AppBar
                    document.getElementById("cmdAdd").addEventListener("click", function (e) {
                        e.preventDefault();
                        nav.navigate("/pages/add/add.html");
                    });
                    document.getElementById("cmdDelete").addEventListener("click", function (e) {
                        e.preventDefault();
                        if (lvNotes.selection.count() == 1) {
                            lvNotes.selection.getItems().done(function (items) {
                                MyApp.notesDataSource.remove(items[0].key);
                            });
                        }
                    });
                })
            );
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };


    var share = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
    share.addEventListener("datarequested", function (e) {
        var lvNotes = document.getElementById("lvNotes").winControl;

        if (lvNotes.selection.count() == 1) {
            lvNotes.selection.getItems().done(function (items) {
                var itemToShare = items[0].data;
                e.request.data.properties.title = itemToShare.title;
                e.request.data.properties.description = "Share a Note";

                // Share plain text version
                e.request.data.setText( convertToText(itemToShare.contents));

                // Share HTML version
                var htmlFormatHelper = Windows.ApplicationModel.DataTransfer.HtmlFormatHelper;
                e.request.data.setHtmlFormat(htmlFormatHelper.createHtmlFormat(itemToShare.contents));
            });
        } else {
            e.request.failWithDisplayText("Please select a note to share.");
        }

    });
    
    // Converts HTML string to plain text string
    function convertToText(html) {
        var div = document.createElement("DIV");
        div.innerHTML = html;
        return div.innerText;
    }


    app.start();
})();
