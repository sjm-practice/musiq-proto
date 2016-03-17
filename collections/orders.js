Orders = new Meteor.Collection('orders');

// by default, disable client inserts, updates, removes
Orders.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Orders.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

var OrdersSchema = new SimpleSchema({
  'userId': {
    type: String,
    label: 'Customer User ID'
  },
  'pizzaId': {
    type: String,
    label: 'ID of Pizza Ordered'
  },
  'date': {
    type: String,
    label: 'Date Pizza Was Ordered'
  }
});

Orders.attachSchema(OrdersSchema);
