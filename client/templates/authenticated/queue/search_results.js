import {musiqApp, STATUS_WAITING} from '/imports/musiqApp';

Template.searchResults.helpers({
  results: function() {
    // TODO determine why musiqApp isn't defined here. (and avoid calling Session directly)
    // return musiqApp.getSearchResults();
    return Session.get('searchResults');
  }
});

Template.searchResults.events({
  'click .addSong': function(e) {
    e.preventDefault();

    // save chosen song, for the selected player
    Requests.insert({
      player: Meteor.user().profile.selectedPlayer,
      title: this.title,
      videoId: this.videoId,
      status: STATUS_WAITING,
      submittedBy: Meteor.user().username,
      created: new Date()
    });
    // clear current search results list (reactive, so updates UI)
    musiqApp.clearSearchResults();
  }
});
