(function () {
    "use strict";

    var navThin;
    var navWide;

    var _AppNavBar = WinJS.UI.Pages.define("/controls/appNavBar/appNavBar.html", {
        ready: function (element, options) {
            navThin = document.getElementById("navThin");
            navWide = document.getElementById("navWide");

            window.onresize = this._performLayout;
            this._performLayout();
        },


        _performLayout: function (element) {
            var width = document.documentElement.offsetWidth;
            if (width < 500) {
                navThin.winControl.disabled = false;
                navWide.winControl.disabled = true;
            } else {
                navThin.winControl.disabled = true;
                navWide.winControl.disabled = false;
            }
        }



    });



    WinJS.Namespace.define("MyControls", {
        AppNavBar: _AppNavBar
    });


})();
