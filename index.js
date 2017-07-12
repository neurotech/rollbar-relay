'use strict';

const Rollbar = require('rollbar');
const moment = require('moment');
const exec = require('child_process');

const token = process.env.ROLLBAR_POST_SERVER_ITEM_ACCESS_TOKEN;
var env = process.env.NODE_ENV || 'production';

var rollbar = new Rollbar({
  accessToken: token,
  environment: env,
  handleUncaughtExceptions: true,
  handleUnhandledRejections: true,
  verbose: false
});

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
  rollbar.critical(event, request, payload);
  _logger(level, event);
};

relay.error = (event, custom, request) => {
  var level = 'error';
  var payload = { level: level };
  if (typeof custom === 'object') { payload.custom = custom; }
  rollbar.error(event, request, payload);
  _logger(level, event);
};

relay.warning = (event, custom, request) => {
  var level = 'warning';
  var payload = { level: level };
  if (typeof custom === 'object') { payload.custom = custom; }
  rollbar.warning(event, request, payload);
  _logger(level, event);
};

relay.info = (event, custom, request) => {
  var level = 'info';
  var payload = { level: level };
  if (typeof custom === 'object') { payload.custom = custom; }
  rollbar.info(event, request, payload);
  _logger(level, event);
};

relay.debug = (event, custom, request) => {
  var level = 'debug';
  var payload = { level: level };
  if (typeof custom === 'object') { payload.custom = custom; }
  rollbar.debug(event, request, payload);
  _logger(level, event);
};

module.exports = relay;
