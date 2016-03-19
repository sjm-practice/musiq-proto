let generateAccounts = () => {

  if (Meteor.users.find().count() < 1) {
    // Create test users
    var currUserId = Accounts.createUser({
      username: 'smarsh',
      email: 'smarsh@test.com',
      password: 'asdfasdf',
      profile: {
        selectedPlayer: 'smarsh'
      }
    });

    currUserId = Accounts.createUser({
      username: 'joe',
      email: 'joe@test.com',
      password: 'asdfasdf',
      profile: {
        selectedPlayer: 'joe'
      }
    });

    currUserId = Accounts.createUser({
      username: 'nikki',
      email: 'nikki@test.com',
      password: 'asdfasdf',
      profile: {
        selectedPlayer: 'nikki'
      }
    });
  }
};

Modules.server.generateAccounts = generateAccounts;
