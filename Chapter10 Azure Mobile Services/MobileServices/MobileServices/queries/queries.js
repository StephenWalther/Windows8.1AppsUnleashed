/// <reference path="//Microsoft.WinJS.2.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.2.0/js/ui.js" />


function init() {

    WinJS.UI.processAll().done(function () {
        var queryResults = document.getElementById("queryResults").winControl;

        // Get Tasks table from Azure Mobile Services
        var mobileServiceClient = new WindowsAzure.MobileServiceClient(
            "https://unleashed.azure-mobile.net/",
            "BpHSExeFtoOdmwGkLRjMHqEnOQyfnI49"
        );
        var tasksTable = mobileServiceClient.getTable('Tasks');

        // Handle query execution
        WinJS.Utilities.query("#queryList a").listen("click", function (e) {
            e.preventDefault();
            
            // Get query name from data-* attribute
            var queryName = e.target.dataset.queryname;

            // Clear total count
            document.getElementById("totalCount").innerText = "";

            // Execute correct query
            switch (queryName) {
                case "lookup":
                    performLookup();
                    break;
                case "takeorderby":
                    performTakeOrderBy();
                    break;
                case "includetotalcount":
                    performIncludeTotalCount();
                    break;
                case "odata":
                    performOData();
                    break;
            }
        });


        // Perform lookup()
        function performLookup() {
            tasksTable.lookup(3).done(
                // Success
                function (result) {
                    queryResults.data = new WinJS.Binding.List([result]);
                },
                // Fail
                function (err) {
                    var md = new Windows.UI.Popups.MessageDialog(err.message);
                    md.showAsync();
                }
            );
        }


        // Perform take() and orderBy()
        function performTakeOrderBy() {
            tasksTable.take(3).orderBy("name").read().done(
                // Success
                function (results) {
                    console.log(JSON.stringify(results));
                    queryResults.data = new WinJS.Binding.List(results);
                },
                // Fail
                function (err) {
                    var md = new Windows.UI.Popups.MessageDialog(err.message);
                    md.showAsync();
                }
            );
        }


        // Perform includeTotalCount()
        function performIncludeTotalCount() {
            tasksTable.includeTotalCount().take(3).orderBy("name").read().done(
                // Success
                function (results) {
                    queryResults.data = new WinJS.Binding.List(results);
                    document.getElementById("totalCount").innerText = results.totalCount + " total records";
                },
                // Fail
                function (err) {
                    var md = new Windows.UI.Popups.MessageDialog(err.message);
                    md.showAsync();
                }
            );
        }


        // Perform OData
        function performOData() {
            var odataQuery = "$filter=startswith(name, 's')";
            tasksTable.read(odataQuery).done(
                // Success
                function (results) {
                    queryResults.data = new WinJS.Binding.List(results);
                },
                // Fail
                function (err) {
                    var md = new Windows.UI.Popups.MessageDialog(err.message);
                    md.showAsync();
                }
            );
        }

    });

}

document.addEventListener("DOMContentLoaded", init);
