(function () {
    "use strict";

    function initialize() {
        // Alias the Scheduler
        var Scheduler = WinJS.Utilities.Scheduler;

        // Create the jobs
        var job1 = Scheduler.schedule(
            function () {
                console.log("Hello from job1");
            },
            Scheduler.Priority.normal
        );

        var job2 = Scheduler.schedule(
            function () {
                console.log("Hello from job2");
            },
            Scheduler.Priority.high
        );

        console.log( Scheduler.retrieveState() );
    };

    document.addEventListener("DOMContentLoaded", initialize);
})();
