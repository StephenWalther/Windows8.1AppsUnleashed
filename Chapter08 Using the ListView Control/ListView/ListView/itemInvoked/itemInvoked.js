(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get reference to ListView control
            var lvProducts = document.getElementById("lvProducts").winControl;

            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                { name: "Bread", price: 2.20 },
                { name: "Cheese", price: 1.19 },
                { name: "Milk", price: 2.33 },
                { name: "Apples", price: 5.20 } 
            ]);

            // Wire up item invoked handler
            lvProducts.addEventListener("iteminvoked", function (e) {
                var itemIndex = e.detail.itemIndex;
                e.detail.itemPromise.then(function (item) {
                    var message = "Invoked item " + itemIndex
                        + " with name " + item.data.name;
                    var md = new Windows.UI.Popups.MessageDialog(message);
                    md.showAsync();
                });
            });

            // Bind the list of products to the ListView
            lvProducts.itemDataSource = listProducts.dataSource;

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
