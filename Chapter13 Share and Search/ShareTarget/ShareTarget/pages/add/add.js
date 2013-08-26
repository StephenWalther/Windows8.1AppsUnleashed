// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/add/add.html", {
        ready: function (element, options) {
            document.getElementById("frmAdd").addEventListener("submit", function (e) {
                e.preventDefault();

                // Save new note and navigate home               
                MyApp.notesDataSource.insertAtEnd(null, {
                    title: document.getElementById("inpTitle").value,
                    contents: toStaticHTML(document.getElementById("inpContents").innerHTML)
                }).done(function (newItem) {
                    WinJS.Navigation.navigate("/pages/home/home.html");
                });
            });
        },

        unload: function () {
        },

        updateLayout: function (element) {
        }
    });
})();
