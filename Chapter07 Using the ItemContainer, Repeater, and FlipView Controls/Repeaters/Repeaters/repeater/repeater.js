(function () {
    "use strict";

    function initialize() {

        WinJS.UI.processAll().done(function () {

            var repeater1 = document.getElementById("repeater1").winControl;

            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                { id: 1, name: "Milk", price: 2.20 },
                { id: 2, name: "Eggs", price: 1.19 },
                { id: 3, name: "Fish", price: 2.33 },
                { id: 4, name: "Peanut Butter", price: 5.20 }
            ]);

            // Bind the list of products to the ListView
            repeater1.data = listProducts;
        });
    }


    document.addEventListener("DOMContentLoaded", initialize);
})();
