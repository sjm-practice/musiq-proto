// Allow the current user, to save their selected player in their own user doc
Meteor.users.allow({
  update: function(userId, doc) {
    return !!userId && userId === doc._id;
  }
});

// Initialize certain properties for newly created users
Accounts.onCreateUser(function(options, user) {

  // if any profile from default hook's profile, keep it
  if (options.profile) {
    user.profile = options.profile;
  }

  // default selectedPlayer (checked in player), to own player
  user.selectedPlayer = user.username;

  return user;
});

// Server Methods / Services for the client
Meteor.methods({
  searchYoutubeVideos: function(searchTitle, maxResults) {
    this.unblock();

    //
    // TODO - research HTTP.call arguments, see of below string could be built a better way
    //
    var searchURL = "https://www.googleapis.com/youtube/v3/search";
    var params = "?part=snippet&maxResults=";
    params += maxResults;
    params += "&q=";
    params += encodeURIComponent(searchTitle);
    params += "&type=video&videoEmbeddable=true&key=";
    params += process.env.YT_API_KEY;

    var response = HTTP.call('GET', searchURL + params);

    if (response.statusCode !== 200 || response.data.items.length === 0) {
      console.log(' ');
      console.log('**** GAPI YOUTUBE SEARCH: bad response or no results');
      console.log('**** search string: ' + searchTitle);
      console.log('**** statusCode:    ' + response.statusCode);
      console.log('**** items count:   ' + response.data.items.length);
      console.log(' ');
    }

    return response.data.items;
  }
});
