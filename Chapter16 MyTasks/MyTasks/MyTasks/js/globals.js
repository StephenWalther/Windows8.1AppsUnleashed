/**********************************************
   Contains properties and methods that
   are global to the app.
   *******************************************/

(function () {
    "use strict";

    var _globals = WinJS.Binding.as({
        selectedDate: new Date()
    });


    WinJS.Namespace.define("MyApp", {
        Globals: _globals
    });


})();