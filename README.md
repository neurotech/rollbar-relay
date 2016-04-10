# :satellite: rollbar-relay

`rollbar-relay` provides a simple API to relay your application's logging events to [Rollbar](https://rollbar.com/).

## Configuration

`rollbar-relay` requires the `ROLLBAR_POST_SERVER_ITEM_ACCESS_TOKEN` environment variable to be set.

This token is listed in your Rollbar project's settings under *Project Access Tokens*.

## Methods

### `critical(event, [custom], [request])`

Description placeholder

#### Arguments

 - `event` - Explanation
 - `custom` - *(Optional)* Explanation
 - `request` - *(Optional)* Explanation

#### Example

```javascript
var event = new Error('CRITICAL ERROR!');
var custom = {
  customErrorData: 'Everything is on fire.'
};
relay.critical(event, custom)
```

### `error(event, [custom], [request])`

Description placeholder

#### Arguments

 - `event` - Explanation
 - `custom` - *(Optional)* Explanation
 - `request` - *(Optional)* Explanation

#### Example

```javascript
var event = new Error('An error has occurred in your application.');
var custom = {
  additionalData: 'String of useful information.'
};
relay.error(event, custom)
```

### `warning(event, [custom], [request])`

Description placeholder

#### Arguments

 - `event` - Explanation
 - `custom` - *(Optional)* Explanation
 - `request` - *(Optional)* Explanation

#### Example

```javascript
var event = 'Warning: /index.html?foo=bar requested.';
var custom = {
  customString: 'Custom information.'
  customIdNumber: 123456
};
var request = {
  headers: {
    header: 'example'
  },
  protocol: 'https',
  url: '/index.html?foo=bar',
  method: 'GET',
  body: 'body',
  route: {
    path: 'home/index'
  }
};
relay.warning(event, custom, request)
```

### `info(event, [custom], [request])`

Description placeholder

#### Arguments

 - `event` - Explanation
 - `custom` - *(Optional)* Explanation
 - `request` - *(Optional)* Explanation

#### Example

```javascript
var event = `Refreshed data at: ${new Date()}`;
var custom = {
  refreshSize: 82917346
};
relay.info(event, custom)
```

### `debug(event, [custom], [request])`

Description placeholder

#### Arguments

 - `event` - Explanation
 - `custom` - *(Optional)* Explanation
 - `request` - *(Optional)* Explanation

#### Example

```javascript
var event = 'Sync with OtherService returned a status code of 999.';
var custom = {
  debugCode: 999
};
relay.debug(event, custom)
```

---

## TODO

 1. Docs (Update README, methods section - descriptions)
 2. Add support for (optional) request object (https://github.com/rollbar/node_rollbar#the-request-object)
 3. Add support for logging to console vs. silent based on environment variable
