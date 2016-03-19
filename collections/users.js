Meteor.users.allow({
  insert: () => false,
  remove: () => false
});

Meteor.users.deny({
  insert: () => true,
  remove: () => true
});

// Allow the current user, to save their selected player in their own user doc
// Meteor.users.allow({
//   update: function(userId, doc) {
//     return !!userId && userId === doc._id;
//   }
// });

