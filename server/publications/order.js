Meteor.publish('order', function () {
  var user = this.userId;

  if (user) {
    var data = [
      Pizza.find({$or: [{'custom': true, 'ownerId': user}, {'custom': false}]}),
      Customers.find({'userId': user})
    ];
  } else {
    var data = Pizza.find({'custom': false});
  }

  if (data) {
    return data;
  }

  return this.ready();
});
