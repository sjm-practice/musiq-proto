Template.videoPlayer.rendered = function() {
  YT.load();
};

Template.videoPlayer.events({
  'click #playNext': function(e) {
    e.preventDefault();
    musiqApp_cueNextSong();
  }
});
