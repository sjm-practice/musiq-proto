Template.player.onCreated(function () {
  this.subscribe('requests');
});

Template.player.helpers({
  siteURL: function() {
    return location.origin;
  }
});
