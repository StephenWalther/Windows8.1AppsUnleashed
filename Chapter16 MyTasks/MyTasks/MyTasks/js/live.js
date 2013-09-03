/**********************************************
   Contains methods for interacting with 
   Live Connect.
   *******************************************/

(function () {
    "use strict";

    var _authenticationToken;
    var _firstName;

    // Initialize with Single SignIn and Basic scopes
    var REDIRECT_DOMAIN = "http://MyTasks.superexpert.com";
    var scopes = ["wl.signin", "wl.basic"];
    WL.init({
        scope: scopes,
        redirect_uri: REDIRECT_DOMAIN
    });

    // Log in to Windows Live
    function login() {
        return new WinJS.Promise(function (complete, error) {
            WL.login().then(
                // Success
                function (loginResults) {
                    _authenticationToken = loginResults.session.authentication_token;

                    // Get first name
                    WL.api({
                        path: "me",
                        method: "GET"
                    }).then(
                        // Success
                        function (results) {
                            _firstName = results.first_name;
                            complete();
                        },
                        // Fail
                        function (results) {
                            error("Could not get first name from live.");
                        }
                    );
                },
                // Fail
                function (loginResults) {
                    error("Could not login to Live.");
                }
            );
        });
    }

    function getAuthenticationToken() {
        return _authenticationToken;
    }


    function getFirstName() {
        return _firstName;
    }


    WinJS.Namespace.define("Live", {
        login: login,
        getAuthenticationToken: getAuthenticationToken,
        getFirstName: getFirstName
    });



})();