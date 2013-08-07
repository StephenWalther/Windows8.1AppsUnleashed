(function () {
    "use strict";

    function initialize() {

        WinJS.UI.processAll().done(function () {

            var repeater1 = document.getElementById("repeater1").winControl;

            // Create a List of evil employees
            var listEmployees = new WinJS.Binding.List([
                {
                    name: "Dr Evil", salary: "billions", minions: new WinJS.Binding.List([
                        { name: "Bad Guy 1", salary: "4 dollars" },
                        { name: "Bad Guy 2", salary: "zero dollars" },
                        { name: "Bad Guy 3", salary: "100 dollars", minions: new WinJS.Binding.List([
                            { name: "Henchman 1", salary: "14 dollars" },
                            { name: "Henchman 2", salary: "1 dollar" }
                        ])}
                    ])
                }
            ]);

            // Bind the list of products to the ListView
            repeater1.data = listEmployees;
        });
    }


    document.addEventListener("DOMContentLoaded", initialize);
})();
