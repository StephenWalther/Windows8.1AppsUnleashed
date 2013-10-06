(function () {
    "use strict";

    function initialize() {
        // Alias the Scheduler
        var Scheduler = WinJS.Utilities.Scheduler;

        // Create low priority job
        Scheduler.schedule(showQuote, Scheduler.Priority.idle);

        // Handle click event
        document.getElementById("btn").addEventListener("click", function () {
            writeMessage("Do Something");
        });
    };

    function showQuote(jobInfo) {
        var allQuotes = [
            "Obstacles are those frightful things you see when you take your eyes off your goal - Ford",
            "I have not failed. I've just found 10,000 ways that won't work - Edison",
            "You can't build a reputation on what you are going to do - Ford"
        ];

        // Busy loop -- don't ever do this!
        while (true) {
            // Yield to higher priority job
            if (jobInfo.shouldYield) {
                writeMessage("Yielding");
                jobInfo.setWork(showQuote);
                break;
            }

            // Display random quote
            var quote = allQuotes[random(allQuotes.length)];
            writeMessage(quote);
        }
    }

    function writeMessage(message) {
        var messages = document.getElementById("messages");
        messages.innerHTML = "<li>" + message + "</li>" + messages.innerHTML;
    }

    function random(upperBound) {
        return Math.floor(Math.random() * upperBound);
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();
