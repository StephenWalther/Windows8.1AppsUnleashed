(function () {
    "use strict";

    function initialize() {
        var options = WinJS.Utilities.query(".option");

        WinJS.UI.processAll().done(function () {

            // When an option state is changed
            options.listen("selectionchanged", function (e) {
                // If selected then unselect all of the other options
                var isSelected = e.target.winControl.selected;
                if (isSelected) {
                    options.forEach(function (option) {
                        if (option != e.target) {
                            option.winControl.selected = false;
                        }
                    })
                }
            });


        });
    }


    document.addEventListener("DOMContentLoaded", initialize);
})();
