(function () {
    'use strict';

    WinJS.UI.Pages.define("accountSettings.html",
    {
        ready: function (element, options) {
            var btnSignIn = document.getElementById("btnSignIn");
            var btnSignOut = document.getElementById("btnSignOut");
            var divMessage = document.getElementById("divMessage");

            // Show/Hide buttons
            btnSignIn.style.display = "none";
            btnSignOut.style.display = "none";
                
            WL.api({
                path: "me",
                method: "GET"
            }).then(
                // Already logged in
                function (results) {
                    if (WL.canLogout()) {
                        btnSignOut.style.display = "";
                    } else {
                        divMessage.innerText = "Sign out of this app "
                            + "from your Windows Live account."
                    }
                },
                // Not logged in
                function (results) {
                    btnSignIn.style.display = "";
                }
            );
           
            btnSignIn.addEventListener("click", function (e) {
                e.preventDefault();

                WL.login({
                    scope: ["wl.basic"]
                }).then(function (response) {
                    WinJS.UI.SettingsFlyout.show();
                });
            });

            btnSignOut.addEventListener("click", function (e) {
                e.preventDefault();

                WL.logout().then(function (response) {
                    WinJS.UI.SettingsFlyout.show();
                });
            });

        }
    });
}());



