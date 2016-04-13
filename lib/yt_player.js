import {musiqApp} from '/imports/musiqApp';

if (Meteor.isClient) {
  // The API will call this function when the video player is ready.
  var onPlayerReady = function(event) {
    // if default / please stand by video, don't start it, let it stay paused (so it's quiet)
    if (musiqApp.startCurrentVideo()) {
      event.target.playVideo();
    }
  };

  // The API calls this function when the player's state changes.
  // The function indicates that when playing a video (state=1),
  // or the player ended (state=0).
  var onPlayerStateChange = function(event) {
    if (event.data == YT.PlayerState.ENDED) {
      musiqApp.cueNextSong();
    }
  };

  // YouTube API will call onYouTubeIframeAPIReady() when API ready.
  // Make sure it's a global variable.
  onYouTubeIframeAPIReady = function () {
    // initialize/render player with song to start with
    var currentVideoId = musiqApp.setCurrentSongToPlay();

    // This function creates an <iframe> and inserts a YouTube player (after API code downloads)
    musiqApp.YoutubePlayer = new YT.Player('ytPlayer', {
      videoId: currentVideoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  };
}
