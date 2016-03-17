musiqApp_YoutubePlayer = '';  // declare global variable for player, initialize later

musiqApp_searchResults = [];
musiqApp_searchResults_dep = new Deps.Dependency();

musiqApp_DEFAULT_STANDBY_VIDEO = 'Q98_0Af8tG8';

musiqApp_STATUS_NOW_PLAYING = 'now playing';
musiqApp_STATUS_WAITING = 'waiting';
musiqApp_STATUS_PLAYED = 'played';

musiqApp_formatSearchResults = function(responseItems) {
  // clear out any previous search results
  musiqApp_searchResults.length = 0;

  _.each(responseItems, function(item) {
    var resultItem = {};
    resultItem.videoId = item.id.videoId;
    resultItem.title = item.snippet.title;
    musiqApp_searchResults.push(resultItem);
  });
  // signal the search list has changed, (triggers ui update)
  musiqApp_searchResults_dep.changed();
};

musiqApp_getCuedVideoId = function() {
  // gets video url, and extracts the video id
  var url = musiqApp_YoutubePlayer.getVideoUrl();
  var match = url.match(/[?&]v=([^&]+)/);
  return match[1];
};

musiqApp_setCurrentSongToPlay = function() {
  // default the song id to standby - aka, no song found
  var currentSongId = musiqApp_DEFAULT_STANDBY_VIDEO;

  // first look for a song on the current player, that was currently playing
  var foundSong = Requests.findOne({player: Meteor.user().username, status: musiqApp_STATUS_NOW_PLAYING});
  if (foundSong !== undefined) {
    currentSongId = foundSong.videoId;
  }
  else {
    // there wasn't a song that was 'now playing', find the first 'waiting' song
    foundSong = Requests.findOne({player: Meteor.user().username, status: musiqApp_STATUS_WAITING}, {sort: {created: 1}});
    if (foundSong !== undefined) {
      currentSongId = foundSong.videoId;
      Requests.update(foundSong._id, {$set: {status: musiqApp_STATUS_NOW_PLAYING}});
    }
  }

  return currentSongId;
};

musiqApp_cueNextSong = function() {
  // find just played song and update status to played
  var playedSong = Requests.findOne({player: Meteor.user().username, status: musiqApp_STATUS_NOW_PLAYING});
  if (playedSong !== undefined) {
    Requests.update(playedSong._id, {$set: {status: musiqApp_STATUS_PLAYED}});
  }

  // load/cue next waiting song
  nextSong = musiqApp_setCurrentSongToPlay();
  if (nextSong === musiqApp_DEFAULT_STANDBY_VIDEO) {
    musiqApp_YoutubePlayer.cueVideoById(nextSong);   //don't play this video, just show thumbnail
  }
  else {
    musiqApp_YoutubePlayer.loadVideoById(nextSong);
  }
};

musiqApp_playerWaitingAndReady = function() {
  // return true if the player is rendered && not playing anything
  return ($('#playNext').length !== 0) &&
    (musiqApp_getCuedVideoId() === musiqApp_DEFAULT_STANDBY_VIDEO);
};

musiqApp_cueNewlyAddedWhenPlayerWaiting = function() {
  if (musiqApp_playerWaitingAndReady()) {
    musiqApp_cueNextSong();
  }
};
