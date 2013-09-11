(function () {
    "use strict";


    var taskIsDone = WinJS.Binding.converter(function (isDone) {
        return isDone ? "line-through" : "";
    });

    var daySelected = WinJS.Binding.converter(function (isSelected) {
        return isSelected ? "#ffa900" : "";
    });

    WinJS.Namespace.define("BindingConverters",
        {
            taskIsDone: taskIsDone,
            daySelected: daySelected
        });

})();