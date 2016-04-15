import {musiqApp, STATUS_WAITING} from '/imports/musiqApp';

let requestsObserver = null;

Template.videoPlayer.onCreated(function() {
  // load / display youtube player
  YT.load();
});

Template.videoPlayer.onRendered(function () {
  let requestsCursor = Requests.find({player: Meteor.user().username,
    status: STATUS_WAITING});

  requestsObserver = requestsCursor.observe({
    added: function (doc) {
      // TODO remove this alert, when you get more comfortable/confident with how the observer behaves
      Bert.alert(`user: ${doc.submittedBy} added request: ${doc.title}`, 'success');
      musiqApp.cueNewlyAddedWhenPlayerWaiting();
    }
  });
});

Template.videoPlayer.onDestroyed(function () {
  requestsObserver.stop();
});

Template.videoPlayer.events({
  'click #playNext': function(e) {
    e.preventDefault();
    musiqApp.cueNextSong();
  }
});
