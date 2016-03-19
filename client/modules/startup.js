let startup = () => {
  _initializeClientSettings();
};

var _initializeClientSettings = () => Modules.client.initializeClientSettings();

Modules.client.startup = startup;
