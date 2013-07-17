(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;

            // TODO: Initialize the page here.
            element.querySelector(".item-image").src = item.backgroundImage;
            element.querySelector(".item-image").alt = item.subtitle;
            element.querySelector(".item-content").innerHTML = item.content;

        }
    });
})();
