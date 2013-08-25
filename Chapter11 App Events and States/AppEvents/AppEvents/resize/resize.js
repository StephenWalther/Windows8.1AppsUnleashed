(function () {
    "use strict";

    function resize() {
        var width = document.documentElement.offsetWidth;
        var isLandscape = window.innerWidth > window.innerHeight;

        if (isLandscape && width > 600) {
            // Show sidebar
            document.getElementById("sidebar").style.display = "";
        } else {
            // Hide sidebar
            document.getElementById("sidebar").style.display = "none";
        }
    }

    window.addEventListener("resize", resize);

})();