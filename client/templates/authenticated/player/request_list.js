Template.requestList.helpers({
  requests: function() {
    // provide all requests for current player, that are ready to play
    return Requests.find({player: Meteor.user().username, $or: [{status: musiqApp_STATUS_WAITING},
                                {status: musiqApp_STATUS_NOW_PLAYING}]},
                          {sort: {created: 1}});
  },
  requestsCount: function() {
    return Requests.find({player: Meteor.user().username, $or: [{status: musiqApp_STATUS_WAITING},
                                {status: musiqApp_STATUS_NOW_PLAYING}]}).count();
  },
  timeDateFormatted: function() {
    var dt = moment(this.created);
    return dt.format('MM-DD h:mma');
  },
  isNowPlaying: function() {
    return (this.status === musiqApp_STATUS_NOW_PLAYING) ? 'nowPlaying' : '';
  }
});
