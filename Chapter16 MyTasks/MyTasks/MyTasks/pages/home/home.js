(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {

            //WinJS.Binding.processAll(document.getElementById("spanSelectedDate"), MyApp.Globals);


            // Get references to controls
            var lvMyTasks = document.getElementById("lvMyTasks").winControl;
            var appNavBar = document.getElementById("appNavBar").winControl;
            var appBar = document.getElementById("appBar").winControl;
            var spanSelectedDate = document.getElementById("spanSelectedDate");


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
                    appBar1.showCommands(document.querySelectorAll('.appBarSelection'));
                    appBar1.show();
                } else {
                    appBar1.hideCommands(document.querySelectorAll('.appBarSelection'));
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
            /// <param name="element" domElement="true" />

            var bob = 1;
        },


    });
})();
