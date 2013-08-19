/// <reference path="//Microsoft.WinJS.2.0.Preview/js/base.js" />
/// <reference path="//Microsoft.WinJS.2.0.Preview/js/ui.js" />


function init() {

    WinJS.UI.processAll().done(function () {
        var lvTasks = document.getElementById("lvTasks").winControl;
        var taskBeingEditedKey = null;
        var tasksList = null;

        // Get Tasks table from Azure Mobile Services
        var mobileServiceClient = new WindowsAzure.MobileServiceClient(
            "https://unleashed.azure-mobile.net/",
            "IwZcChdiEkqUvZBzPrHCNVifFpVgto72"
        );
        var tasksTable = mobileServiceClient.getTable('Tasks');

        // Bind tasks to ListView
        tasksTable.read().done(
            // Success
            function (results) {
                tasksList = new WinJS.Binding.List(results);
                lvTasks.itemDataSource = tasksList.dataSource;
                document.getElementById("listViewLoading").style.display = "none";
            },
            // Fail
            function () {
                var md = new Windows.UI.Popups.MessageDialog("Could not retrieve tasks!");
                md.showAsync();
            }
        );


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
