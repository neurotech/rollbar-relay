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

const _logger = (level, event) => {
  switch (level) {
    case 'critical':
      console.error(`[${level}] ${event.stack}`);
      break;

    case 'error':
      console.error(`[${level}] ${event.stack}`);
      break;

    case 'warning':
      console.log(`[${level}] ${event}`);
      break;

    case 'info':
      console.log(`[${level}] ${event}`);
      break;

    case 'debug':
      console.log(`[${level}] ${event}`);
      break;
  }
};

relay.critical = (event, custom, request) => {
  var level = 'critical';
  var payload = { level: level };
  if (typeof custom === 'object') { payload.custom = custom; }
  rollbar.handleErrorWithPayloadData(event, payload, request);
  _logger(level, event);
};

relay.error = (event, custom, request) => {
  var level = 'error';
  var payload = { level: level };
  if (typeof custom === 'object') { payload.custom = custom; }
  rollbar.handleErrorWithPayloadData(event, payload, request);
  _logger(level, event);
};

relay.warning = (event, custom, request) => {
  var level = 'warning';
  var payload = { level: level };
  if (typeof custom === 'object') { payload.custom = custom; }
  rollbar.reportMessageWithPayloadData(event, payload, request);
  _logger(level, event);
};

relay.info = (event, custom, request) => {
  var level = 'info';
  var payload = { level: level };
  if (typeof custom === 'object') { payload.custom = custom; }
  rollbar.reportMessageWithPayloadData(event, payload, request);
  _logger(level, event);
};

relay.debug = (event, custom, request) => {
  var level = 'debug';
  var payload = { level: level };
  if (typeof custom === 'object') { payload.custom = custom; }
  rollbar.reportMessageWithPayloadData(event, payload, request);
  _logger(level, event);
};

module.exports = relay;
