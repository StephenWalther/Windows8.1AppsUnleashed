/**********************************************
   Contains methods for interacting with 
   Windows Azure Mobile Services.

   Before you can use this library, you
   must update the application key used
   with the MobileServiceClient class below
   with your application key from
   http://manage.WindowsAzure.com
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
                "UwwtpnstPevKuiMVexFXIEHYpolhAx51"
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
            _myTasksTable.orderByDescending("id").where({date:selectedDate}).read().done(
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
            _myTasksList.dataSource.insertAtStart(null, newTask).done(function (newListItem) {
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
                        _myTasksList.dataSource.remove(newListItem.key).done(function () {
                            error(err);
                        });
                    }
                );
            });
        });
    }


    function removeMyTask(item) {
        return new WinJS.Promise(function (complete, error) {
            // Be optimistic
            _myTasksList.dataSource.remove(item.key).done(function () {
                // Actually do the delete
                _myTasksTable.del(item.data).done(
                    // Success
                    function () {
                        complete();
                    },
                    // fail
                    function (err) {
                        // Add back the item
                        _myTasksList.dataSource.insertAtStart(item.key, item.data).done(function () {
                            error(err);
                        });
                    }
                );
            });
        });
    }

    function toggleDone(item) {
        return new WinJS.Promise(function (complete, error) {
            // Be optimistic
            var clone = {
                id: item.data.id,
                name: item.data.name,
                dateCreated: item.data.dateCreated,
                isDone: !item.data.isDone
            };
            _myTasksList.dataSource.change(item.key, clone).done(function () {
                // Actually do the update
                _myTasksTable.update(clone).done(
                    // Success
                    function () {
                        complete();
                    },
                    // fail
                    function (err) {
                        // revert
                        _myTasksList.dataSource.change(item.key, item.data).done(function () {
                            error(err);
                        });
                    }
                );
            });
        });
    }




    WinJS.Namespace.define("Services", {
        login: login,
        getMyTasks: getMyTasks,
        addMyTask: addMyTask,
        removeMyTask: removeMyTask,
        toggleDone: toggleDone,
        myTasksList: _myTasksList
    });


})();