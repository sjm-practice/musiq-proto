Template.myQueue.helpers({
  playerQueueItems: function() {
    // Get all requests for currently selected player
    return Requests.find({player: Meteor.user().profile.selectedPlayer,
                          $or: [{status: musiqApp_STATUS_WAITING},
                                {status: musiqApp_STATUS_NOW_PLAYING}]},
                        {sort: {created: 1}});
  }
});
