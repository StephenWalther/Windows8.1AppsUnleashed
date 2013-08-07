(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {

            // Get elements
            var webView1 = document.getElementById("webView1");
            var imgCapture = document.getElementById("imgCapture");
            var inpAddress = document.getElementById("inpAddress");
            var btnNavigate = document.getElementById("btnNavigate");
            var btnCapture = document.getElementById("btnCapture");

            // Handle navigate
            btnNavigate.addEventListener("click", function () {
                webView1.navigate(inpAddress.value);
            });
            
            // Handle capture
            btnCapture.addEventListener("click", function () {
                var captureOperation = webView1.capturePreviewToBlobAsync();
                captureOperation.oncomplete = function (e) {
                    // Get the capture
                    var image = e.target.result;

                    // Use HTML5 File API to create object URL to refer to the photo file
                    var imageUrl = URL.createObjectURL(image);

                    // Show photo in IMG element
                    imgCapture.src = imageUrl;
                };
                captureOperation.start();
            });


        });
    }

    document.addEventListener("DOMContentLoaded", initialize);


})();

