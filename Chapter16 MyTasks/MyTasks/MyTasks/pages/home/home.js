(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {

            WinJS.Binding.processAll(document.getElementById("spanSelectedDate"), MyApp.Globals);


            // Get references to controls
            var lvMyTasks = document.getElementById("lvMyTasks").winControl;
            var appBar1 = document.getElementById("appBar1").winControl;

            // Update ListView with My Tasks
            Services.getMyTasks();

            // Hide selection commands by default
            appBar1.hideCommands(document.querySelectorAll('.appBarSelection'));


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


        }




    });
})();
