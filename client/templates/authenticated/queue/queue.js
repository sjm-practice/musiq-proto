import {musiqApp} from '/imports/musiqApp'

Template.queue.onCreated(function () {
  this.subscribe('players');
  this.subscribe('requests');
});

Template.queue.events({
  'change #playerName': function(e) {
    Meteor.users.update(Meteor.userId(), {$set: {"profile.selectedPlayer": $('#playerName').val()}});
  },

  'submit form': function(e) {
    e.preventDefault();
    var searchTitle = $(e.target).find('[name=videoSearchTitle]').val();

    Meteor.call('searchYoutubeVideos', searchTitle, 12, function(error, responseItems) {
      if (error) {
        console.log(error.reason);
      }
      musiqApp.formatSearchResults(responseItems);
    });

    // clear out the search box
    $(e.target).find('[name=videoSearchTitle]').val('');
  }
});

Template.queue.helpers({
  players: function() {
    return Meteor.users.find({},
      {
        fields: {'username': 1},
        sort: {'username': 1}
      }
    );
  },

  isSelectedPlayer: function() {
    return (Meteor.user().profile.selectedPlayer === this.username) ? 'selected' : '';
  }
});
