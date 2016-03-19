Meteor.users.allow({
  insert: () => false,
  remove: () => false
});

Meteor.users.deny({
  insert: () => true,
  remove: () => true
});

