// Initialize certain properties for newly created users
Accounts.onCreateUser(function (options, user) {

  // if any profile from default hook's profile, keep it
  if (options.profile) {
    user.profile = options.profile;
  }

  // default selectedPlayer (checked in player), to own player
  user.selectedPlayer = user.username;

  return user;
});
