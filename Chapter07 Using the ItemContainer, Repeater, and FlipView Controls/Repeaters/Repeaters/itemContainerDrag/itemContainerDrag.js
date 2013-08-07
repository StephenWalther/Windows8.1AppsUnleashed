(function () {
    "use strict";

    function initialize() {
        var dragMeItem = null;
        var dropTarget = document.getElementById("dropTarget");

        WinJS.UI.processAll().done(function () {
            // Handle drag start - called when you start dragging an ItemContainer
            WinJS.Utilities.query(".dragMe").listen("dragstart", function (e) {
                dragMeItem = e.target;
            });

            // Handle dragover to indicate valid drop targets
            // Call preventDefault() when over valid target
            dropTarget.addEventListener("dragover", function (e) {
                e.preventDefault();
            });


            // Handle dragenter/dragleave to highlight drop target
            dropTarget.addEventListener("dragenter", function () {
                dropTarget.classList.add("hiLite");
            });
            dropTarget.addEventListener("dragleave", function () {
                dropTarget.classList.remove("hiLite");
            });

            // Handle drop to perform the drop
            dropTarget.addEventListener("drop", function (e) {
                // Get value of data-item and show it
                dropTarget.innerHTML = "Dropped " + dragMeItem.parentElement.dataset["item"];
            });

            // Handle dragend to clean up
            document.addEventListener("dragend", function (e) {
                dropTarget.classList.remove("hiLite");
            });

        });

    }


    document.addEventListener("DOMContentLoaded", initialize);
})();
