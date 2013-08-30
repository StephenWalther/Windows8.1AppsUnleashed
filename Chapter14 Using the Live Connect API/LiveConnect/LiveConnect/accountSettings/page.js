(function () {
    "use strict";

    // Update display when login status changes
    function init() {
        var spanResults = document.getElementById("spanResults");

        WL.Event.subscribe("auth.login", function () {
            spanResults.innerText = "Signed In";
        });

        WL.Event.subscribe("auth.logout", function () {
            spanResults.innerText = "Signed Out";
        });

        var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";
        var scopes = ["wl.basic"];
        WL.init({
            scope: scopes,
            redirect_uri: REDIRECT_DOMAIN
        });
    }

    // Create Account Settings and Privacy Settings Flyouts
    function settings(e) {
        e.detail.applicationcommands = {
            "divAccount": { href: "accountSettings.html", title: "Account" },
            "divPrivacy": { href: "privacySettings.html", title: "Privacy" },
        };
        WinJS.UI.SettingsFlyout.populateSettings(e);
    }

    document.addEventListener("DOMContentLoaded", init);
    WinJS.Application.addEventListener("settings", settings);

    WinJS.Application.start();
})();
