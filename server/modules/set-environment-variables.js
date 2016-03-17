let setEnvironmentVariables = () => {
  if ( Meteor.settings.private ) {
    process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
  }

  //load api key from env var
  let keyStr = process.env.YT_API_KEY;
  if (keyStr) {
    console.log('env var: ' + keyStr.slice(0, 3) + '...');
  } else {
    console.log('unable to read YK env variable');
  }

};

Modules.server.setEnvironmentVariables = setEnvironmentVariables;
