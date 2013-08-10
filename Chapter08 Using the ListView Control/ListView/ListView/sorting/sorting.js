(function () {
    "use strict";


    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get references to DOM elements
            var lvProducts = document.getElementById("lvProducts").winControl;
            var sortBy = document.getElementById("sortBy");


            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                { name: "Bread", price: 2.20 },
                { name: "Cheese", price: 1.19 },
                { name: "Milk", price: 2.33 },
                { name: "Maple Syrup", price: 2.33 },
                { name: "Apples", price: 5.20 },
                { name: "Steak", price: 12.99 }
            ]);

            function bindProducts() {
                switch (sortBy.value) {
                    case "name":
                        lvProducts.itemDataSource = listProducts.createSorted(sortByName).dataSource;
                        break;
                    case "price":
                        lvProducts.itemDataSource = listProducts.createSorted(sortByPrice).dataSource;
                        break;
                }
            }

            function sortByName(item1, item2) {
                return item1.name > item2.name ? 1 : -1;
            }

            function sortByPrice(item1, item2) {
                return item1.price > item2.price ? 1 : -1;
            }


            // Bind the products to the ListView
            bindProducts();

            // When changing sort, resort products
            sortBy.addEventListener("change", function () {
                bindProducts();
            });

            // This is a live sorted data source!
            listProducts.push({ name: "Mystery Meat", price: 99 });
        });
    }


    document.addEventListener("DOMContentLoaded", initialize);
})();
