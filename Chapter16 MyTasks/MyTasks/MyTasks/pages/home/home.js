(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

       
        ready: function (element, options) {
            var that = this;

            // Get references to controls
            var lvMyTasks = document.getElementById("lvMyTasks").winControl;
            var appNavBar = document.getElementById("appNavBar").winControl;
            var appBar = document.getElementById("appBar").winControl;
            var spanSelectedDate = document.getElementById("spanSelectedDate");
            var btnRead = document.getElementById("btnRead");

            // Layout page
            this._performLayout();


            // When navigating to new date, update tasks
            appNavBar.addEventListener("datechange", function (e) {
                // Update displayed date
                spanSelectedDate.innerText = appNavBar.selectedDate.toLocaleDateString();

                // Update ListView with My Tasks
                Services.getMyTasks(appNavBar.selectedDate).done(
                    // Success
                    function () {
                        that.updateNoTasks();
                    },
                    // Fail
                    function (err) {
                        var message = "Could not retrieve tasks: " + err.message;
                        var md = new Windows.UI.Popups.MessageDialog(message);
                        md.showAsync();
                    }
                );
            });


            // Default date is today
            appNavBar.selectedDate = new Date();


 
            // Read tasks out loud
            btnRead.addEventListener("click", function (e) {
                e.preventDefault();

                // Build soliloquy
                var soliliquy = "Hello " + Live.getFirstName();
                if (Services.myTasksList.length == 0) {
                    soliliquy += ", you do not have any tasks for this day."
                } else {
                    soliliquy += ", these are your tasks:";
                    Services.myTasksList.forEach(function (item) {
                        soliliquy += item.name;
                        if (item.isDone) {
                            soliliquy += "(This task is already completed).";
                        }
                    });
                }
                Speech.say(soliliquy);
            });

            // Hide selection commands by default
            appBar.hideCommands(document.querySelectorAll('.appBarSelection'));


            // When ListView item selected, display app bar
            lvMyTasks.addEventListener("selectionchanged", function () {
                if (lvMyTasks.selection.count() > 0) {
                    appBar.showCommands(document.querySelectorAll('.appBarSelection'));
                    appBar.show();
                } else {
                    appBar.hideCommands(document.querySelectorAll('.appBarSelection'));
                };
            });

            // Handle creating new task
            frmAdd.addEventListener("submit", function (e) {
                e.preventDefault();

                var taskName = document.getElementById("inputTaskName").value;
                var newTask = {
                    name: taskName,
                    date: appNavBar.selectedDate,
                    isDone: false
                };
                Services.addMyTask(newTask).done(
                    // Success
                    function () {
                        // Clear the form
                        e.target.reset();
                        that.updateNoTasks();
                    },
                    // Fail
                    function (err) {
                        var message = "Could not create task: " + err.message;
                        var md = new Windows.UI.Popups.MessageDialog(message);
                        md.showAsync();
                    }
                );
            });


            // Handle removing tasks
            document.getElementById("cmdDelete").addEventListener("click", function () {
                // Get selected items from ListView
                lvMyTasks.selection.getItems().done(function (items) {
                    // We need to build up an array of promises and
                    // check whether all of the promises succeeded because
                    // you can only show a Message Dialog once
                    var promises = [];
                    for (var i = 0; i < items.length; i++) {
                        promises.push(Services.removeMyTask(items[i]));
                    }
                    WinJS.Promise.join(promises).done(
                        // Success
                        function () { 
                            that.updateNoTasks();
                        },
                        // Fail
                        function (err) {
                            var message = "Could not delete task: " + err[0].message;
                            var md = new Windows.UI.Popups.MessageDialog(message);
                            md.showAsync();
                        }
                    );
                });
            });




            // Handle toggle done
            document.getElementById("cmdToggleDone").addEventListener("click", function () {
                // Get selected items from ListView
                lvMyTasks.selection.getItems().done(function (items) {
                    // We need to build up an array of promises and
                    // check whether all of the promises succeeded because
                    // you can only show a Message Dialog once
                    var promises = [];
                    for (var i = 0; i < items.length; i++) {
                        promises.push(Services.toggleDone(items[i]));
                    }
                    WinJS.Promise.join(promises).done(
                        // Success
                        function() {},
                        // Fail
                        function(err) {
                            var message = "Could not update task: " + err[0].message;
                            var md = new Windows.UI.Popups.MessageDialog(message);
                            md.showAsync();
                        }
                    );
                });
            });

        },

        updateNoTasks: function() {
            var divNoTasks = document.getElementById("divNoTasks");
            if (Services.myTasksList.length == 0) {
                divNoTasks.style.display = "block";
            } else {
                divNoTasks.style.display = "none";
            }
        },
 
        updateLayout: function (element) {
            this._performLayout();
        },

        // We show the ListView in a list when
        // the screen gets too small
        _performLayout: function (element) {
            var width = document.documentElement.offsetWidth;
            var height = document.documentElement.offsetHeight;
            var lvMyTasks = document.getElementById("lvMyTasks").winControl;
            var spanMyTasks = document.getElementById("spanMyTasks");

            // The height of the ListView is 80% of the screen
            lvMyTasks.element.style.height = (height * 0.80) + "px";

            // When the width of the screen is less than 500px then show as List
            if (width < 500) {
                lvMyTasks.layout = new WinJS.UI.ListLayout();
                lvMyTasks.forceLayout();
                spanMyTasks.style.display = "none";
            } else {
                lvMyTasks.layout = new WinJS.UI.GridLayout();
                lvMyTasks.forceLayout();
                spanMyTasks.style.display = "";
            }

        }

    });
})();
