let generateAccounts = () => {

  if (Meteor.users.find().count() < 1) {
    // Create test users
    var currUserId = Accounts.createUser({
      username: 'smarsh',
      email: 'smarsh@test.com',
      password: 'asdfasdf'
    });
    // Note, wasn't able to set a custom property when using createUser
    Meteor.users.update(currUserId, {$set: {selectedPlayer: 'smarsh'}});

    currUserId = Accounts.createUser({
      username: 'joe',
      email: 'joe@test.com',
      password: 'asdfasdf'
    });
    Meteor.users.update(currUserId, {$set: {selectedPlayer: 'smarsh'}});

    currUserId = Accounts.createUser({
      username: 'nikki',
      email: 'nikki@test.com',
      password: 'asdfasdf'
    });
    Meteor.users.update(currUserId, {$set: {selectedPlayer: 'nikki'}});
  }
};

Modules.server.generateAccounts = generateAccounts;
