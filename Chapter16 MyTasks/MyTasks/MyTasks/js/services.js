/**********************************************
   Contains methods for interacting with 
   Windows Azure Mobile Services.
   *******************************************/
(function () {
    "use strict";

    var _myTasksList = new WinJS.Binding.List();
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

    function getMyTasks(selectedDate) {
        var that = this;
        return new WinJS.Promise(function (complete, error) {
            _myTasksTable.read(selectedDate).done(
                // Success
                function (results) {
                    _myTasksList.splice(0, _myTasksList.length);
                    for (var i = 0; i < results.length; i++) {
                        _myTasksList.push(results[i]);
                    }
                    complete();
                },
                // Fail
                function (err) {
                    error(err);
                }
            );
        });
    }

    function addMyTask(newTask) {
        return new WinJS.Promise(function (complete, error) {
            // Be optimistic
            _myTasksList.dataSource.insertAtEnd(null, newTask).done(function (newListItem) {
                // Actually do the insert
                _myTasksTable.insert(newTask).done(
                    // Success
                    function (newDBItem) {
                        // Update the list item with the DB item
                        _myTasksList.dataSource.change(newListItem.key, newDBItem).done(function () {
                            complete();
                        });
                    },
                    // fail
                    function (err) {
                        // Remove the item

                        error(err);
                    }
                );


            });


        });
    }


   


    WinJS.Namespace.define("Services", {
        login: login,
        getMyTasks: getMyTasks,
        addMyTask: addMyTask,
        myTasksList: _myTasksList
    });


})();