(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            var btnTypeface = document.getElementById("btnTypeface");
            var flyTypeface = document.getElementById("flyTypeface").winControl;
            var selectTypeface = document.getElementById("selectTypeface");
            var pText = document.getElementById("pText");

            // Wire-up handler to show FlyOut
            btnTypeface.addEventListener("click", function () {
                flyTypeface.show(btnTypeface);
            });

            // Wire-up handler for typeface select
            selectTypeface.addEventListener("change", function () {
                pText.style.fontFamily = selectTypeface.value;

                // Hide the flyout
                flyTypeface.hide();
            });

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
