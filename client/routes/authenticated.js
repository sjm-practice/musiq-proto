const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    // if going to an authenticated route, and user is not logged in, redirect to login
    FlowRouter.go( 'login' );
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/queue', {
  name: 'queue',
  action() {
    BlazeLayout.render( 'default', { yield: 'queue' } );
  }
});

authenticatedRoutes.route( '/player', {
  name: 'player',
  action() {
    BlazeLayout.render( 'default', { yield: 'player' } );
  }
});
