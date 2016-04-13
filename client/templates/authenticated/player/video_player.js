import {musiqApp} from '/imports/musiqApp';

Template.videoPlayer.rendered = function() {
  // load / display youtube player
  YT.load();
};

Template.videoPlayer.events({
  'click #playNext': function(e) {
    e.preventDefault();
    musiqApp.cueNextSong();
  }
});
