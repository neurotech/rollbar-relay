'use strict';

const relay = require('./index');

const _randomString = () => {
  // Thanks to: http://stackoverflow.com/a/1349426
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const _randomNumber = () => {
  // Thanks to: http://stackoverflow.com/a/1527834
  return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
};

const criticalEvent = new Error(`rollbar-relay has encountered a CRITICAL event! [${_randomString()}]`);
const errorEvent = new Error(`rollbar-relay has encountered an ERROR event! [${_randomString()}]`);
const warningEvent = `rollbar-relay has encountered a WARNING event! [${_randomString()}]`;
const infoEvent = `rollbar-relay has encountered an INFORMATION event! [${_randomString()}]`;
const debugEvent = `rollbar-relay has encountered a DEBUG event! [${_randomString()}]`;

var exampleCustom = () => {
  var payload = {
    exampleString: _randomString(),
    exampleIdNumber: _randomNumber()
  };
  return payload;
};

var exampleRequest = {
  headers: {
    host: 'localhost',
    Authorization: 'Basic username:accessKey',
    Server: 'rollbar-relay Example Application'
  },
  protocol: 'https',
  url: '/index.html?foo=bar',
  method: 'GET',
  body: 'body',
  route: {
    path: 'home/index'
  }
};

relay.critical(criticalEvent, exampleCustom());
relay.error(errorEvent, null, exampleRequest);
relay.warning(warningEvent, exampleCustom());
relay.info(infoEvent);
relay.debug(debugEvent);

// Handle uncaught exceptions:
function foo () {
  return bar();
}

foo();
