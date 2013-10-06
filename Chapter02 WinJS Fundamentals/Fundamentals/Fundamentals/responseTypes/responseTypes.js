(function () {
    "use strict";

    function initialize() {

var options = {
    url: "http://stephenwalther.com/feed",
    responseType: "document"
};

WinJS.xhr(options).done(
    function (xhr) {
        var result = xhr.response;  // xhr.response is a document
        console.log("result is a " + typeof (result));
    }
);
};

    document.addEventListener("DOMContentLoaded", initialize);
})();
