'use strict';

const rollbar = require('rollbar');
const moment = require('moment');
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
  var now = moment().format('YYYY-MM-DD HH:mm:ss');

  switch (level) {
    case 'critical':
      console.error(`[${level}] [${now}] ${event.stack}`);
      break;

    case 'error':
      console.error(`[${level}] [${now}] ${event.stack}`);
      break;

    case 'warning':
      console.log(`[${level}] [${now}] ${event}`);
      break;

    case 'info':
      console.log(`[${level}] [${now}] ${event}`);
      break;

    case 'debug':
      console.log(`[${level}] [${now}] ${event}`);
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
