(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {


        ready: function (element, options) {

            // Get references to controls
            var lvMyTasks = document.getElementById("lvMyTasks").winControl;
            var appNavBar = document.getElementById("appNavBar").winControl;
            var appBar = document.getElementById("appBar").winControl;
            var spanSelectedDate = document.getElementById("spanSelectedDate");
            var divNoTasks = document.getElementById("divNoTasks");

            // Layout page
            this._performLayout();

            // Show/hide no tasks for date
            lvMyTasks.addEventListener("loadingstatechanged", function(e) {
                if (lvMyTasks.loadingState == "complete") {
                    if (Services.myTasksList.length == 0) {
                        divNoTasks.style.display = "block";
                    } else {
                        divNoTasks.style.display = "none";
                    }
                }
            });


            // When navigating to new date, update tasks
            appNavBar.addEventListener("datechange", function (e) {
                // Update displayed date
                spanSelectedDate.innerText = appNavBar.selectedDate.toLocaleDateString();

                // Update ListView with My Tasks
                Services.getMyTasks(appNavBar.selectedDate);
            });


            // Default date is today
            appNavBar.selectedDate = new Date();


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
                Services.addMyTask({ name: taskName }).done(
                    // Success
                    function () {
                        // Clear the form
                        e.target.reset();
                    },
                    // Fail
                    function (errorMessage) {
                        var bob = errorMessage;
                    }
                );
            });


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

            // The height of the ListView is 80% of the screen
            lvMyTasks.element.style.height = (height * 0.80) + "px";

            // When the width of the screen is less than 500px then show as List
            if (width < 500) {
                lvMyTasks.layout = new WinJS.UI.ListLayout();
                lvMyTasks.forceLayout();
            } else {
                lvMyTasks.layout = new WinJS.UI.GridLayout();
                lvMyTasks.forceLayout();
            }

        }

    });
})();
