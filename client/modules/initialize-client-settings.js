let initializeClientSettings = () => {

  // adjust default display time to 1.8 seconds (down from 3.5)
  Bert.defaults.hideDelay = 1800;

};

Modules.client.initializeClientSettings = initializeClientSettings;
