/**********************************************
   Contains methods for interacting with 
   Windows Azure Mobile Services.
   *******************************************/
(function () {
    "use strict";

    var _myTasksDataSource = new WinJS.Binding.List();
    var _mobileServiceClient, _myTasksTable;

    // Log in to Windows Azure Mobile Services
    function login(authenticationToken) {
        return new WinJS.Promise(function (complete, error) {
            // Ready mobile service client
            _mobileServiceClient = new WindowsAzure.MobileServiceClient(
                "https://mytasksunleashed.azure-mobile.net/",
                "ZyaOPrwmWnPjsaZDKuwbxwivAaUDYg47"
            );

            // Login to Windows Azure
            _mobileServiceClient.login(authenticationToken).done(
                // Success
                function (azureLoginResults) {
                    // Get tasks table
                    _myTasksTable = _mobileServiceClient.getTable('MyTasks');

                    // All done
                    complete();
                },
                // Fail
                function (azureLoginResults) {
                    error(azureLoginResults.message);
                }
            );

        });
    }

    function getMyTasks() {
        return new WinJS.Promise(function (complete, error) {
            _myTasksTable.read().done(
                // Success
                function (results) {
                    _myTasksDataSource = new WinJS.Binding.List(results);
                }
            );
        });
    }


    WinJS.Namespace.define("Services", {
        login: login,
        getMyTasks: getMyTasks,
        myTasksDataSource: _myTasksDataSource.dataSource
    });


})();