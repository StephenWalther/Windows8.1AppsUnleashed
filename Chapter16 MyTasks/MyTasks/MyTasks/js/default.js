(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    // The startup method ensures that you are 
    // connected to Live and Azure before 
    // doing anything else.
    function startup() {
        return new WinJS.Promise(function (complete) {
            function login() {
                // Login to Live
                Live.login().done(
                    // Success
                    function () {
                        // Login to Azure Mobile Services
                        Services.login(Live.getAuthenticationToken()).done(
                            // Success
                            function () {
                                complete();
                            },
                            // Fail
                            function (errorMessage) {
                                // If first we don't succeed, try again ad nauseum
                                var message = "Could not connect to Windows Azure. " + errorMessage;
                                var md = new Windows.UI.Popups.MessageDialog(message);
                                md.commands.append(new Windows.UI.Popups.UICommand("&Retry"));
                                md.showAsync().done(login);
                            }
                        );
                    },
                    // Fail
                    function () {
                        // If first we don't succeed, try again ad nauseum
                        var md = new Windows.UI.Popups.MessageDialog("Could not connect to the Internet.");
                        md.commands.append(new Windows.UI.Popups.UICommand("&Retry"));
                        md.showAsync().done(login);
                    }
                );
            }

            // Start recursing until complete
            login();
        });
    }




    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            // This might take a while
            args.setPromise(WinJS.UI.processAll().then(function () {
                // Login to both Live and Azure
                startup().done(function () {
                    // After logging in, navigate to page
                    if (app.sessionState.history) {
                        nav.history = app.sessionState.history;
                    }
                    if (nav.location) {
                        nav.history.current.initialPlaceholder = true;
                        return nav.navigate(nav.location, nav.state);
                    } else {
                        return nav.navigate(Application.navigator.home);
                    }
                });

            }));
        }
    });

    app.oncheckpoint = function (args) {
        app.sessionState.history = nav.history;
    };


    WinJS.Application.addEventListener("settings", function settings(e) {
        e.detail.applicationcommands = {
            "divPrivacy": { href: "/privacySettings/privacySettings.html", title: "Privacy" },
        };
        WinJS.UI.SettingsFlyout.populateSettings(e);
    });


    app.start();
})();
