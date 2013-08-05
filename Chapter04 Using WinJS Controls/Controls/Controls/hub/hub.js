(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            var hub = document.getElementById("hub").winControl;
            hub.addEventListener("headerinvoked", function(e) {
                var section = e.detail.section;
                var sectionIndex = e.detail.index;

                // Display clicked section index and name
                console.log("You clicked on section " + section.header
                    + " with index " + sectionIndex);
            });
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
