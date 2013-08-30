(function () {
    "use strict";
    var props = Windows.Storage.SystemProperties;

    // Add new content to the index
    function add(id, value, itemNameDisplay, keywords, comment) {
        // Get the indexer
        var indexer = Windows.Storage.Search.ContentIndexer.getIndexer();

        // Create content for the indexer
        var content = new Windows.Storage.Search.IndexableContent();
        var contentStream = new Windows.Storage.Streams.InMemoryRandomAccessStream();
        var contentWriter = new Windows.Storage.Streams.DataWriter(contentStream);
        contentWriter.writeString(value);

        return contentWriter.storeAsync().then(function () {
            content.id = id;
            content.properties.insert(props.itemNameDisplay, itemNameDisplay);
            content.properties.insert(props.keywords, keywords);
            content.properties.insert(props.comment, comment);
            contentStream.seek(0);
            content.stream = contentStream;
            content.streamContentType = "text/html";
            return indexer.addAsync(content);
        }).then(function () {
            contentStream.close();
            contentWriter.close();
        })
    }

    // Returns id of matching items from query
    function query(queryText) {
        var indexer = Windows.Storage.Search.ContentIndexer.getIndexer(); 
        var query = indexer.createQuery(queryText, []); 
        return query.getAsync().then(function(queryResults) {
            var searchResults = [];
            for (var i = 0; i < queryResults.length; i++) {
                searchResults.push(queryResults[i].id);
            }
            return searchResults;
        });
    }

    // Delete entire index
    function nuke() {
        var indexer = Windows.Storage.Search.ContentIndexer.getIndexer();
        indexer.deleteAllAsync();
    }

    WinJS.Namespace.define("Indexer", {
        add: add,
        query: query,
        nuke: nuke
    });
})();