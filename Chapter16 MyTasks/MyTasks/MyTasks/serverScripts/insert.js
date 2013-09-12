function insert(item, user, request) {

    // Add user to task
    item.userId = user.userId;

    request.execute();

}