# :satellite: rollbar-relay

`rollbar-relay` provides a small set of simple methods that you can use to easily send your application's exception and logging events to [Rollbar](https://rollbar.com/).

## Installation

Install with `npm` and save as a dependency:

```shell
npm install rollbar-relay --save
```

Require the module in your application:

```javascript
const relay = require('rollbar-relay');
```

## Configuration

`rollbar-relay` requires the `ROLLBAR_POST_SERVER_ITEM_ACCESS_TOKEN` environment variable to be set.

This token is listed in your Rollbar project's settings under *Project Access Tokens*.

## Example

`example.js` exists in this module's directory that will send some example events to your Rollbar project.

## Methods

### `critical(event, [custom], [request])`

POSTs an event to Rollbar with a severity level of `critical`.

#### Arguments

 - `event` - The specific `Error` event that has occurred.
 - `custom` - *(Optional)* An `Object` containing custom data associated with the event.
 - `request` - *(Optional)* See: [node_rollbar's docs](https://github.com/rollbar/node_rollbar#the-request-object) regarding 'The Request Object'.

#### Example

```javascript
var event = new Error('CRITICAL ERROR!');
var custom = {
  customErrorData: 'Everything is on fire.'
};

relay.critical(event, custom)
```

### `error(event, [custom], [request])`

POSTs an event to Rollbar with a severity level of `error`.

#### Arguments

 - `event` - The specific `Error` event that has occurred.
 - `custom` - *(Optional)* An `Object` containing custom data associated with the event.
 - `request` - *(Optional)* See: [node_rollbar's docs](https://github.com/rollbar/node_rollbar#the-request-object) regarding 'The Request Object'.

#### Example

```javascript
var event = new Error('An error has occurred in your application.');
var custom = {
  additionalData: 'String of useful information.'
};

relay.error(event, custom)
```

### `warning(event, [custom], [request])`

POSTs an event to Rollbar with a severity level of `warning`.

#### Arguments

 - `event` - A `String` representing some sort of information related to activity in your application.
 - `custom` - *(Optional)* An `Object` containing custom data associated with the event.
 - `request` - *(Optional)* See: [node_rollbar's docs](https://github.com/rollbar/node_rollbar#the-request-object) regarding 'The Request Object'.

#### Example

```javascript
var event = 'Warning: /index.html?foo=bar requested.';
var custom = {
  customString: 'Custom information.'
  customIdNumber: 123456
};
var request = {
  headers: {
    host: 'localhost',
    Authorization: 'Basic username:accessKey',
    Server: 'rollbar-relay Example Application'
  },
  protocol: 'https',
  url: 'https://locahost/index.html?foo=bar',
  method: 'GET',
  body: 'body',
  route: {
    path: 'home/index'
  }
};

relay.warning(event, custom, request)
```

### `info(event, [custom], [request])`

POSTs an event to Rollbar with a severity level of `info`.

#### Arguments

 - `event` - A `String` representing some sort of information related to activity in your application.
 - `custom` - *(Optional)* An `Object` containing custom data associated with the event.
 - `request` - *(Optional)* See: [node_rollbar's docs](https://github.com/rollbar/node_rollbar#the-request-object) regarding 'The Request Object'.

#### Example

```javascript
var event = `Refreshed data at: ${new Date()}`;
var custom = {
  refreshSize: 82917346
};

relay.info(event, custom)
```

### `debug(event, [custom], [request])`

POSTs an event to Rollbar with a severity level of `debug`.

#### Arguments

 - `event` - A `String` representing some sort of information related to activity in your application.
 - `custom` - *(Optional)* An `Object` containing custom data associated with the event.
 - `request` - *(Optional)* See: [node_rollbar's docs](https://github.com/rollbar/node_rollbar#the-request-object) regarding 'The Request Object'.

#### Example

```javascript
var event = 'Sync with OtherService returned a status code of 999.';
var custom = {
  debugCode: 999
};

relay.debug(event, custom)
```
