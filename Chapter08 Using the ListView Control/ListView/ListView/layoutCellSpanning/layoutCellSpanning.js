(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get reference to ListView control
            var lvProducts = document.getElementById("lvProducts").winControl;

            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                { name: "Bread", price: 2.20, tileSize:"wide" },
                { name: "Cheese", price: 1.19, tileSize:"normal"  },
                { name: "Milk", price: 2.33, tileSize: "tall" },
                { name: "Apples", price: 5.20, tileSize: "normal" },
                { name: "Steak", price: 12.99, tileSize: "normal" },
                { name: "Oranges", price: 2.20, tileSize: "wide" },
                { name: "Carrots", price: 1.19, tileSize: "normal" },
                { name: "Yogurt", price: 2.33, tileSize: "normal" },
                { name: "Eggs", price: 5.20, tileSize: "normal" },
                { name: "Soda", price: 12.99, tileSize: "normal" },
                { name: "Steak", price: 12.99, tileSize: "normal" },
                { name: "Oranges", price: 2.20, tileSize: "normal" },
                { name: "Carrots", price: 1.19, tileSize: "normal" },
                { name: "Yogurt", price: 2.33, tileSize: "normal" },
                { name: "Eggs", price: 5.20, tileSize: "normal" },
                { name: "Soda", price: 12.99, tileSize: "normal" }

            ]);


            lvProducts.layout.groupInfo = function(groupInfo) {
                return {
                    enableCellSpanning: true,
                    cellWidth: 270,
                    cellHeight: 270
                };
            };

            lvProducts.layout.itemInfo = function (itemIndex) {
                var item = listProducts.getItem(itemIndex);

                var size = null;
                switch (item.data.tileSize) {
                    case "normal":
                        size = {
                            width: 270,
                            height: 270
                        };
                        break;
                    case "wide":
                        size = {
                            width: 550,
                            height: 270
                        };
                        break;
                    case "tall":
                        size = {
                            width: 270,
                            height: 550
                        };
                        break;
                }
                return size;
            };




            // Bind the list of products to the ListView
            lvProducts.itemDataSource = listProducts.dataSource;

        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
