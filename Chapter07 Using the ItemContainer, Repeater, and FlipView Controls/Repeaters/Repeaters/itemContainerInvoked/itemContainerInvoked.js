(function () {
    "use strict";

    function initialize() {

        var options = WinJS.Utilities.query(".option");

        WinJS.UI.processAll().done(function () {

            options.listen("invoked", function (e) {
                var md = new Windows.UI.Popups.MessageDialog(e.target.dataset["option"]);
                md.showAsync();
            });

        });

    }


    document.addEventListener("DOMContentLoaded", initialize);
})();
