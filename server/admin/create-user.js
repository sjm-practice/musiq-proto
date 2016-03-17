Accounts.onCreateUser(function (options, user) {
  if (options.profile && options.profile.customer) {
    customer = options.profile.customer;
    customer.userId = user._id;

    delete options.profile;

    Customers.insert(customer);
  }

  if (options.profile) {
    user.profile = options.profile;
  }

  return user;
});
