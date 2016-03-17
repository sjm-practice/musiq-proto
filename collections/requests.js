Requests = new Meteor.Collection('requests');

Requests.allow({
  // allow logged in users to add requests
  insert: function(userId, doc) {
    return !!userId;
  },
  // allow logged in users' players to update the status of requests
  update: function(userId, doc) {
    return !!userId;
  }
});
