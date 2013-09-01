function init() {

    WinJS.UI.processAll().done(function () {
        var lvTasks = document.getElementById("lvTasks").winControl;
        var taskBeingEditedKey = null;
        var tasksList = null;

 
        // Login and Bind tasks to ListView
        var REDIRECT_DOMAIN = "http://liveSDKDemo.Superexpert.com";
        var mobileServicesClient, tasksTable;

        var scopes = ["wl.signin"];
        WL.init({
            scope: scopes,
            redirect_uri: REDIRECT_DOMAIN
        });

        WL.login().then(
            // Success
            function (wlLoginResults) {
                // Ready mobile service client
                mobileServiceClient = new WindowsAzure.MobileServiceClient(
                    "https://unleashed.azure-mobile.net/",
                    "TzXsPHIiLhFwtBEUpoDPDZcvwVoold62"
                );

                // Login to Windows Azure
                mobileServiceClient.login(wlLoginResults.session.authentication_token).done(
                    // Success
                    function(azureLoginResults) {
                        // Get tasks table
                        tasksTable = mobileServiceClient.getTable('Tasks');

                        // Go grab the tasks
                        bindTasks();
                    },
                    // Fail
                    function (azureLoginResults) {
                        var md = new Windows.UI.Popups.MessageDialog("Could not login to Azure!");
                        md.showAsync();
                    }
                );
            },
            // Fail
            function (loginResponse) {
                var md = new Windows.UI.Popups.MessageDialog("Could not login to Live Connect!");
                md.showAsync();
            }
        );

        function bindTasks() {
            tasksTable.read().done(
                // Success
                function (results) {
                    tasksList = new WinJS.Binding.List(results);
                    lvTasks.itemDataSource = tasksList.dataSource;
                    document.getElementById("listViewLoading").style.display = "none";
                },
                // Fail
                function (results) {
                    var md = new Windows.UI.Popups.MessageDialog("Could not retrieve tasks!");
                    md.showAsync();
                }
            );
        }


        // Show selected task in form
        lvTasks.addEventListener("selectionchanged", function () {
            if (lvTasks.selection.count() == 1) {
                lvTasks.selection.getItems().done(function (items) {
                    taskBeingEditedKey = items[0].key;
                    document.getElementById("inputTaskName").value = items[0].data.name;
                })
            } else {
                taskBeingEditedkey = null;
                document.getElementById("inputTaskName").value = "";
            }
        });


        // Handle form submit
        document.getElementById("frmSave").addEventListener("submit", function (evt) {
            evt.preventDefault();

            // Get the task from the form
            var taskName = document.getElementById("inputTaskName").value;

            // Either update or insert the task
            if (taskBeingEditedKey === null) {
                insertTask(taskName);
            } else {
                updateTask(taskName);
            }
        });


        function insertTask(taskName) {
            var newTask = {
                name: taskName
            };

            // Call insert on the mobile service
            tasksTable.insert(newTask).done(
                // Success
                function (result) {
                    // Add new item to Binding.List
                    tasksList.dataSource.insertAtEnd(result.id.toString(), result).done(
                        function (item) {
                            // Ensure new item is visible
                            lvTasks.ensureVisible(item.index);

                            // Reset the form
                            document.getElementById("frmSave").reset();
                        }
                    )
                },
                // Failure
                function (err) {
                    var errorText = err.request.responseText;
                    var md = new Windows.UI.Popups.MessageDialog(errorText);
                    md.showAsync();
                }
            );
        }

        function updateTask(taskName) {
            // Get the original task
            var originalTask = tasksList.getItemFromKey(taskBeingEditedKey).data;

            // Update the name
            originalTask.name = taskName;

            // Call update on the mobile service
            tasksTable.update(originalTask).done(
                // Success
                function (result) {
                    tasksList.dataSource.change(taskBeingEditedKey, result);

                    // reset form
                    taskBeingEditedKey = null;
                    document.getElementById("frmSave").reset();
                },
                // Fail
                function (err) {
                    var errorText = err.request.responseText;
                    var md = new Windows.UI.Popups.MessageDialog(errorText);
                    md.showAsync();
                }
            );
        }


        document.getElementById("btnDelete").addEventListener("click", function () {
            if (lvTasks.selection.count() == 1) {
                lvTasks.selection.getItems().done(function (items) {
                    tasksTable.del(items[0].data).done(
                        // Success
                        function () {
                            tasksList.dataSource.remove(items[0].key);
                            taskBeingEditedKey = null;
                        },
                        // Fail
                        function (err) {
                            var errorText = err.request.responseText;
                            var md = new Windows.UI.Popups.MessageDialog(errorText);
                            md.showAsync();
                        }
                    )
                });
            }
        });


        document.getElementById("btnNuke").addEventListener("click", function () {
            mobileServiceClient.invokeApi("nuke", { method: "post" }).done(
                // Success
                function () {
                    // Empty the Binding List
                    tasksList = new WinJS.Binding.List();
                    lvTasks.itemDataSource = tasksList.dataSource;
                },
                function (err) {
                    var errorText = err.request.responseText;
                    var md = new Windows.UI.Popups.MessageDialog(errorText);
                    md.showAsync();
                }
            )
        });

    });

}

document.addEventListener("DOMContentLoaded", init);
