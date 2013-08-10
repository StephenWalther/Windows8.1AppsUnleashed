(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get references to elements and controls
            var lvProducts = document.getElementById("lvProducts").winControl;
            var divMessage = document.getElementById("divMessage");

            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                { name: "Bread", price: 2.20 },
                { name: "Cheese", price: 1.19 },
                { name: "Milk", price: 2.33 },
                { name: "Apples", price: 5.20 }
            ]);


            listProducts.addEventListener("itemmoved", function (e) {
                var product = e.detail.value;
                var oldIndex = e.detail.oldIndex;
                var newIndex = e.detail.newIndex;

                var message = "item " + product.name
                    + " moved from " + oldIndex
                    + " to " + newIndex;

                divMessage.innerHTML = message;
            });



            // Bind the list of products to the ListView
            lvProducts.itemDataSource = listProducts.dataSource;

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
