function del(id, user, request) {
    // Make sure that user is updating their own task
    tables.getTable("MyTasks").where({ id: id, userId: user.userId }).read({
        success: function (results) {
            if (results.length == 0) {
                request.respond(statusCodes.UNAUTHORIZED, "Not your task.");
                return;
            }
            request.execute();
        }
    });

}