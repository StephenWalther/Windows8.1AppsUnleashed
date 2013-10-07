

function init() {

    WinJS.UI.processAll().done(function () {

        var lvTasks = document.getElementById("lvTasks").winControl;
        var tasksDataSource = new DataSources.WebServiceDataSource("http://localhost:51807/api/tasks", "id");
        
        // Bind ListView to web data source
        lvTasks.itemDataSource = tasksDataSource;

        // Show progress 
        lvTasks.addEventListener("loadingstatechanged", function (e) {
            if (lvTasks.loadingState == "complete") {
                document.getElementById("listViewLoading").style.display = "none";
            }
        });

        // Wire-up Add, Delete, Nuke buttons
        document.getElementById("frmAdd").addEventListener("submit", function (evt) {
            evt.preventDefault();
            tasksDataSource.beginEdits();
            tasksDataSource.insertAtEnd(null, {
                name: document.getElementById("inputTaskName").value
            }).done(function (newItem) {
                tasksDataSource.endEdits();
                document.getElementById("frmAdd").reset();

                // Show last item added
                lvTasks.itemDataSource.getCount().done(function (count) {
                    lvTasks.ensureVisible(count);
                })
            });
        });

        document.getElementById("btnDelete").addEventListener("click", function () {
            if (lvTasks.selection.count() == 1) {
                lvTasks.selection.getItems().done(function (items) {
                    tasksDataSource.beginEdits();
                    tasksDataSource.remove(items[0].key).done(function () {
                        tasksDataSource.endEdits();
                    });
                });
            }
        });


        document.getElementById("btnEdit").addEventListener("click", function () {
            if (lvTasks.selection.count() == 1) {
                lvTasks.selection.getItems().done(function (items) {
                    tasksDataSource.beginEdits();
                    var taskToChange = items[0].data;
                    taskToChange.name = "Changed!";
                    tasksDataSource.change(items[0].key, taskToChange).done(function () {
                        tasksDataSource.endEdits();
                    });
                });
            }
        });


        document.getElementById("btnNuke").addEventListener("click", function () {
            tasksDataSource.beginEdits();
            tasksDataSource.nuke().done(function () {
                tasksDataSource.endEdits();
            });
        });


    });


}

document.addEventListener("DOMContentLoaded", init);
