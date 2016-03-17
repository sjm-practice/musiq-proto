Meteor.publish('pizzaProfile', function () {
  var user = this.userId;

  var data = [
    Pizza.find({$or: [{'custom': true, 'ownerId': user}, {'custom': false}]}),
    Customers.find({'userId': user}),
    Orders.find({'userId': user})
  ];

  if (data) {
    return data;
  }

  return this.ready();
});
