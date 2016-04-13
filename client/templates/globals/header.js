import {musiqApp} from '/imports/musiqApp'

Template.header.helpers({
  brandLink() {
    let login = FlowRouter.path( 'login' ),
        index = FlowRouter.path( 'index' );
    return !Meteor.loggingIn() && !Meteor.userId() ? login : index;
  }
});

Template.header.events({
  'click .logout' () {

    // ideally, these would be done on the logout callback, but It seems like
    // something, possibly FlowRouter, is redrawing the current screen and in
    // some cases (when on myqueue and myplayer user and profile become null)
    // and throw exceptions [they are harmless for the most part]
    musiqApp.clearSearchResults();
    FlowRouter.go('index');

    Meteor.logout( ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        Bert.alert( 'Logged out!', 'success' );
      }
    });
  }
});
