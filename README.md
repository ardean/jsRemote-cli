# jsRemote
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]

**NodeJS Desktop Remote using W3C Pointer Lock & Events**

I use this package to control my Windows PC (hooked up to a projector) from my mac.

Sadly I could not find a way to start the service automatically at boot time.
On my Desktop is a shortcut to a "start jsRemote" batch file `run as Admin enabled`.

This package should work with `Linux` / `macOS` / `Windows` but was **only tested** on Windows and a little bit on macOS.

And yes, you can play `most` games with it... :wink:


## Installation

```bash
npm i -g jsremote
```

## Launch

```bash
jsRemote
```

- optional `-p PORT` /  `--port PORT`

Now open `http://HOST_IP_ADDRESS:PORT/` on your remote device and choose a mode to control your host.

## Modes

There are 2 modes to control a host:

- `Mouse` - default on **Desktop** devices
- `Touch` - default on **Mobile** devices

## TODO

- virtual keyboard support (touch only devices)
- special controls (escape button)

## License

[MIT](LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/jsremote.svg
[npm-url]: https://npmjs.org/package/jsremote
[downloads-image]: https://img.shields.io/npm/dm/jsremote.svg
[downloads-url]: https://npmjs.org/package/jsremote
[license-image]: https://img.shields.io/npm/l/jsremote.svg
[license-url]: LICENSE
