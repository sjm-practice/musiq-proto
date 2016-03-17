const dualUseRoutes = FlowRouter.group({
  name: 'dualUse'
});

dualUseRoutes.route( '/info', {
  name: 'info',
  action() {
    BlazeLayout.render('default', {yield: 'info'});
  }
});


