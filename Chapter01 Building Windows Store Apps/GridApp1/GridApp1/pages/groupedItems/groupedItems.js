(function () {
    "use strict";

    var nav = WinJS.Navigation;

    WinJS.UI.Pages.define("/pages/groupedItems/groupedItems.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var listView = element.querySelector(".groupeditemslist").winControl;
            listView.groupHeaderTemplate = element.querySelector(".headertemplate");
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.addEventListener("groupheaderinvoked", this._groupHeaderInvoked.bind(this));
            listView.addEventListener("iteminvoked", this._itemInvoked.bind(this));
            listView.itemDataSource = Data.items.dataSource;
            listView.groupDataSource = Data.groups.dataSource;
            listView.element.focus();
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },

        _groupHeaderInvoked: function (args) {
            var group = Data.groups.getAt(args.detail.groupHeaderIndex);
            nav.navigate("/pages/groupDetail/groupDetail.html", { groupKey: group.key });
        },

        _itemInvoked: function (args) {
            var item = Data.items.getAt(args.detail.itemIndex);
            nav.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
        }
    });
})();
