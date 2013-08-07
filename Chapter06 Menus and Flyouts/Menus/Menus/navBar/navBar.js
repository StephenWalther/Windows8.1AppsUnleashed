(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {

            //var navBar1 = document.getElementById("navBar1");
            //navBar1.addEventListener("invoked", function (e) {
            //    var command = ev.detail.navbarCommand;
            //    console.log("Navigate to " + command.label);
            //});

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
