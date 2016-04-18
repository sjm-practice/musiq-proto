// Initialize certain properties for newly created users
Accounts.onCreateUser(function (options, user) {

  // Use a provided profile, or create an empty object
  user.profile = options.profile || {};

  // default selectedPlayer (checked in player), to own player
  user.profile.selectedPlayer = user.username;

  return user;
});

// Enforce than username is required for created new users.
// Note, the 403 comes from following the example in docs.meteor.com
Accounts.validateNewUser(function (user) {
  if (user.username && user.username.length >= 3) {
    return true;
  } else {
    throw new Meteor.Error('403', "Username must have at lest 3 characters");
  }
});
