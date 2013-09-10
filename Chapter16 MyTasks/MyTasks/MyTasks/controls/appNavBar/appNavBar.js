(function () {
    "use strict";

    var _AppNavBar = WinJS.UI.Pages.define("/controls/appNavBar/appNavBar.html", {
        
        navThin: null,
        datePicker: null,
        navWide: null,
        navWideContainer: null,

        init: function() {
            MyControls.AppNavBar.Data.selectedDate = new Date();
            MyControls.AppNavBar.Data.dateRange = new WinJS.Binding.List();
        },


        ready: function (element, options) {
            var that = this;

            // Get references to the elements/controls
            that.navThin = document.getElementById("navThin").winControl;
            that.datePicker = document.getElementById("datePicker").winControl;
            that.navWide = document.getElementById("navWide").winControl;
            that.navWideContainer = document.getElementById("navWideContainer");

            // Handle date change events from children
            that.datePicker.addEventListener("change", function (e) {
                that.selectedDate = that.datePicker.current;
            });

            // Handle navigation
            that.navWideContainer.addEventListener("invoked", function (e) {
                that.selectedDate = e.detail.data.date;
            });

            // When the app is resized, show different nav bars
            window.addEventListener("resize", this._performLayout);
            that._performLayout();
        },

        // Get/Set current selected date
        selectedDate: {
            get: function() {
                return MyControls.AppNavBar.Data.selectedDate;
            },
            set: function (value) {
                // Discard the time
                value.setHours(0, 0, 0, 0);

                // Set the date
                MyControls.AppNavBar.Data.selectedDate = value;

                // Update the date range in wide navbar
                this._calculateDateRange();

                // Tell everyone about the change
                this.dispatchEvent("datechange");
            }
        },
 
        // Binds days of week to NavBar
        _calculateDateRange: function () {
            // day names
            var days = [
                "Prev",
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Next"
            ];

            // Get date range
            var dateRange = MyControls.AppNavBar.Data.dateRange;

            // Clear out current date range
            dateRange.splice(0, dateRange.length);

            // Get start date
            var dayBeforeSundayOffset = this.selectedDate.getDay() + 1;
            var startDate = new Date(
                this.selectedDate.getFullYear(),
                this.selectedDate.getMonth(),
                this.selectedDate.getDate() - dayBeforeSundayOffset
            );

            // Loop through prev + 7 days + next
            var currentDate;
            for (var i = 0; i < 9; i++) {
                currentDate = new Date(
                    startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate() + i
                );

                dateRange.push({
                    label: days[i],
                    date: currentDate
                });
            }
        },

        // We either show a list of days (Sunday, Monday, Tuesday...)
        // or we show just the date depending on the width of the app.
        _performLayout: function (element) {
            var width = document.documentElement.offsetWidth;
            if (width < 500) {
                this.navThin.disabled = false;
                this.navWide.disabled = true;
            } else {
                this.navThin.disabled = true;
                this.navWide.disabled = false;
            }
        }

    });

    // Expose a datechange event
    WinJS.Class.mix(_AppNavBar, WinJS.Utilities.createEventProperties("datechange"));
    WinJS.Class.mix(_AppNavBar, WinJS.UI.DOMEventMixin);

    WinJS.Namespace.define("MyControls", {
        AppNavBar: _AppNavBar
    });

    WinJS.Namespace.define("MyControls.AppNavBar.Data");

})();
