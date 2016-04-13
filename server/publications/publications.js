import {STATUS_PLAYED} from '/imports/musiqApp';

Meteor.publish('requests', function() {
  // publish all requests, that have not yet played
  return Requests.find(
    {status: {$ne: STATUS_PLAYED}},
    {sort: {created: 1}}
  );
});

Meteor.publish('players', function() {
  // publish a list of players (keeps this separate from a user list)
  return Meteor.users.find(
    {},
    {
      fields: {username: 1, selectedPlayer: 1},
      sort: {username: 1}
    }
  );
});
