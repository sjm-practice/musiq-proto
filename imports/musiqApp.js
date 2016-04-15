export const STATUS_NOW_PLAYING = 'now playing',
  STATUS_WAITING = 'waiting',
  STATUS_PLAYED = 'played';

const SEARCH_RESULTS = 'searchResults';

class MusiqApp {
  constructor(standbyVideoId = 'Q98_0Af8tG8') {
    this.standbyVideoId = standbyVideoId;   // defaults to a 'please standy by' video
    this.YoutubePlayer = '';  // declare a variable for YT player, gets initialized later
  }

  clearSearchResults() {
    Session.set(SEARCH_RESULTS, null);
  }

  storeSearchResults(resultList) {
    Session.set(SEARCH_RESULTS, resultList);
  }

  // TODO this should be getting called, but musiqApp is undefined where it is called.
  // see other TODO.
  getSearchResults() {
    Session.get(SEARCH_RESULTS);
  }

  formatSearchResults(responseItems) {
    // clear out any previous search results
    this.clearSearchResults();

    let formattedResultArray = [];

    _.each(responseItems, function(item) {
      var resultItem = {};
      resultItem.videoId = item.id.videoId;
      resultItem.title = item.snippet.title;
      formattedResultArray.push(resultItem);
    });

    this.storeSearchResults(formattedResultArray);
  }

  getCuedVideoId() {
    // gets video url, and extracts the video id
    // TODO in some cases, we lose YoutubePlayer, and get an exception when calling
    // getVideoUrl. figure that out. will see exceptions on the client console.
    var url = this.YoutubePlayer.getVideoUrl();
    var match = url.match(/[?&]v=([^&]+)/);
    return match[1];
  }

  setCurrentSongToPlay() {
    // default the song id to standby - aka, no song found
    var currentSongId = this.standbyVideoId;

    // first look for a song on the current player, that was currently playing
    var foundSong = Requests.findOne({player: Meteor.user().username, status: STATUS_NOW_PLAYING});
    if (foundSong !== undefined) {
      currentSongId = foundSong.videoId;
    }
    else {
      // there wasn't a song that was 'now playing', find the first 'waiting' song
      foundSong = Requests.findOne({player: Meteor.user().username, status: STATUS_WAITING}, {sort: {created: 1}});
      if (foundSong !== undefined) {
        currentSongId = foundSong.videoId;
        Requests.update(foundSong._id, {$set: {status: STATUS_NOW_PLAYING}});
      }
    }

    return currentSongId;
  }

  cueNextSong() {
    // find just played song and update status to played
    var playedSong = Requests.findOne({player: Meteor.user().username, status: STATUS_NOW_PLAYING});
    if (playedSong !== undefined) {
      Requests.update(playedSong._id, {$set: {status: STATUS_PLAYED}});
    }

    // load/cue next waiting song
    let nextSong = this.setCurrentSongToPlay();
    if (nextSong === this.standbyVideoId) {
      this.YoutubePlayer.cueVideoById(nextSong);   //don't play this video, just show thumbnail
    }
    else {
      this.YoutubePlayer.loadVideoById(nextSong);
    }
  }

  playerWaitingAndReady() {
    let playerRendered = $('#playNext').length !== 0;
    let onStandby = this.getCuedVideoId() === this.standbyVideoId;

    return playerRendered && onStandby;
  }

  cueNewlyAddedWhenPlayerWaiting() {
    if (this.playerWaitingAndReady()) {
      this.cueNextSong();
    }
  }

  startCurrentVideo() {
    return this.getCuedVideoId() !== this.standbyVideoId;
  }
}

let musiqApp = new MusiqApp();

export {musiqApp};
