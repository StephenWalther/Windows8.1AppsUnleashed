(function () {
    "use strict";

    function initialize() {
        WinJS.UI.processAll().done(function () {
            // Get references to elements and controls
            var lvProducts = document.getElementById("lvProducts").winControl;
            var divCart = document.getElementById("divCart");
            var ulCart = document.getElementById("ulCart");
            
            // Create a List of products
            var listProducts = new WinJS.Binding.List([
                { name: "Bread", price: 2.20 },
                { name: "Cheese", price: 1.19 },
                { name: "Milk", price: 2.33 },
                { name: "Apples", price: 5.20 }
            ]);

 
            // Bind the list of products to the ListView
            lvProducts.itemDataSource = listProducts.dataSource;
 
            lvProducts.addEventListener("itemdragstart", function (e) {
                var selectedIndex = e.detail.dragInfo.getIndices()[0];
                e.detail.dataTransfer.setData("Text", JSON.stringify(selectedIndex));
            });

            // Allow drop on cart
            divCart.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            // highlight cart on hover
            divCart.addEventListener("dragenter", function (e) {
                divCart.classList.add("hiLite");
            });

            // unhighlight when leave hover
            divCart.addEventListener("dragleave", function (e) {
                divCart.classList.remove("hiLite");
            });

            // handle drop
            divCart.addEventListener("drop", function (e) {
                var selectedIndex = JSON.parse(e.dataTransfer.getData("Text"));
                listProducts.dataSource.itemFromIndex(selectedIndex).then(function (selectedItem) {
                    ulCart.innerHTML += "<li>" + selectedItem.data.name + "</li>";
                });
            });

            // cleanup
            divCart.addEventListener("dragend", function (e) {
                divCart.classList.remove("hiLite");
            });


        });
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
