Template.player.onCreated(function () {
  this.subscribe('players');
  this.subscribe('requests');
});

Template.player.helpers({
  siteURL: function() {
    return location.origin;
  }
});
