(function () {
    "use strict";

    function initialize() {

        WinJS.UI.processAll().done(function () {

            var repeater1 = document.getElementById("repeater1").winControl;

            // Create a List of options
            var listOptions = new WinJS.Binding.List([
                { name: "Option 1" },
                { name: "Option 2" },
                { name: "Option 3" }
            ]);

            // Bind the list of products to the ListView
            repeater1.data = listOptions;
        });
    }


    document.addEventListener("DOMContentLoaded", initialize);
})();
