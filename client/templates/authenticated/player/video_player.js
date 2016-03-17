//
// TODO - namespace the yt player initialization code
//

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// The API will call this function when the video player is ready.
var onPlayerReady = function(event) {
  // if default / please stand by video, don't start it, let it stay paused (so it's quiet)
  if (musiqApp_getCuedVideoId() !== musiqApp_DEFAULT_STANDBY_VIDEO) {
    event.target.playVideo();
  }
};

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// or the player ended (state=0).
var onPlayerStateChange = function(event) {
  if (event.data == YT.PlayerState.ENDED) {
    musiqApp_cueNextSong();
  }
};

Template.videoPlayer.rendered = function() {
  // initialize/render player with song to start with
  var currentVideoId = musiqApp_setCurrentSongToPlay();

  // This function creates an <iframe> and inserts a YouTube player (after API code downloads)
  musiqApp_YoutubePlayer = new YT.Player('ytPlayer', {
    videoId: currentVideoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

Template.videoPlayer.events({
  'click #playNext': function(e) {
    e.preventDefault();
    musiqApp_cueNextSong();
  }
});
