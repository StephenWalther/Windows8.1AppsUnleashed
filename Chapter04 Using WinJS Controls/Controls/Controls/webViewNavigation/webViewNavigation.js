(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {

            // Get webview
            var webView1 = document.getElementById("webView1");

            // Navigate to wikipedia
            webView1.navigate("http://wikipedia.org/wiki/minecraft");

            // Display only wikipedia ages
            webView1.addEventListener("MSWebViewNavigationStarting", function (e) {
                var uri = new Windows.Foundation.Uri(e.uri);
                if (uri.domain !== "wikipedia.org") {
                    // prevent navigation
                    e.preventDefault();

                    // show a popup message
                    var md = new Windows.UI.Popups.MessageDialog("Cannot leave Wikipedia!");
                    md.showAsync();
                }
            });

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
