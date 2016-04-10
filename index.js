'use strict';

const rollbar = require('rollbar');
const exec = require('child_process');

const token = process.env.ROLLBAR_POST_SERVER_ITEM_ACCESS_TOKEN;
var sha = exec.execSync('git rev-parse HEAD').toString('utf8').trim();
var env = process.env.NODE_ENV || 'production';

rollbar.init(token, {
  environment: env,
  codeVersion: sha
});
rollbar.handleUncaughtExceptions(token, { exitOnUncaughtException: true });

var relay = {};

relay.critical = (event, custom) => {
  var payload = { level: 'critical' };
  if (custom) { payload.custom = custom; }
  rollbar.handleErrorWithPayloadData(event, payload);
};

relay.error = (event, custom) => {
  var payload = { level: 'error' };
  if (custom) { payload.custom = custom; }
  rollbar.handleErrorWithPayloadData(event, payload);
};

relay.warning = (event, custom) => {
  var payload = { level: 'warning' };
  if (custom) { payload.custom = custom; }
  rollbar.reportMessageWithPayloadData(event, payload);
};

relay.info = (event, custom) => {
  var payload = { level: 'info' };
  if (custom) { payload.custom = custom; }
  rollbar.reportMessageWithPayloadData(event, payload);
};

relay.debug = (event, custom) => {
  var payload = { level: 'debug' };
  if (custom) { payload.custom = custom; }
  rollbar.reportMessageWithPayloadData(event, payload);
};

module.exports = relay;
