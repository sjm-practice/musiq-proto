import {STATUS_WAITING, STATUS_NOW_PLAYING} from '/imports/musiqApp';

Template.myQueue.helpers({
  playerQueueItems: function() {
    // Get all requests for currently selected player
    return Requests.find({player: Meteor.user().profile.selectedPlayer,
                          $or: [{status: STATUS_WAITING},
                                {status: STATUS_NOW_PLAYING}]},
                        {sort: {created: 1}});
  }
});
