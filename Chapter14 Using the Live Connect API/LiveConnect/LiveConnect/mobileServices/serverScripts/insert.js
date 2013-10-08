function insert(item, user, request) {
    // Cleanup data
    item.name = item.name.trim();

    // Validate
    if (item.name.length === 0) {
        request.respond(statusCodes.BAD_REQUEST, "You fool! Task name is required!!!");
        return;
    }

    // Add user to task
    item.userId = user.userId;

    // Otherwise, execute request
    request.execute();
}
