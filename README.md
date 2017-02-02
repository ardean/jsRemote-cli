# jsRemote
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

**NodeJS Desktop Remote using W3C Pointer Lock**

I use this package to control my Windows PC (hooked up to a projector) from my mac.

Sadly I could not find a way to start the service automatically at boot time.
On my Desktop is a shortcut to a "start jsRemote" batch file `run as Admin enabled`.

This package should work with `Linux` / `Mac` / `Windows` but is **only tested** on Windows.

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

Open remote client on another machines's browser:

http://myipaddress:4444/

## TODO

- mobile controls
- special controls (escape button)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/jsremote.svg
[npm-url]: https://npmjs.org/package/jsremote
[downloads-image]: https://img.shields.io/npm/dm/jsremote.svg
[downloads-url]: https://npmjs.org/package/jsremote
