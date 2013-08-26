(function () {
    "use strict";
    
    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
            var lvCategories = document.getElementById("lvCategories").winControl;

            // Bind the categories to the ListView
            var dsCategories = new WinJS.Binding.List(MyApp.categoriesAndProducts);
            lvCategories.itemDataSource = dsCategories.dataSource;
           
            // Retrieve selected category index from state
            WinJS.Navigation.state = WinJS.Navigation.state || {};
            var selectedCategoryIndex = WinJS.Navigation.state.selectedCategoryIndex;
            if (selectedCategoryIndex > -1) {
                lvCategories.selection.set(selectedCategoryIndex);
            }

            // Navigate when item invoked
            lvCategories.addEventListener("iteminvoked", function (e) {
                // Store index of invoked category in history
                WinJS.Navigation.state = { selectedCategoryIndex: e.detail.itemIndex };

                // Navigate with invoked category name
                e.detail.itemPromise.done(function (item) {
                    WinJS.Navigation.navigate(
                        "/pages/details/details.html",
                        { selectedCategoryName: item.data.categoryName }
                    );

                });
            });
        }
    });
})();
