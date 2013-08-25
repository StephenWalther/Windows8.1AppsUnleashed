(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            console.log("processed");
        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();