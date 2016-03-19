// Initialize certain properties for newly created users
Accounts.onCreateUser(function (options, user) {

  // Use a provided profile, or create an empty object
  user.profile = options.profile || {};

  // default selectedPlayer (checked in player), to own player
  user.profile.selectedPlayer = user.username;

  return user;
});
