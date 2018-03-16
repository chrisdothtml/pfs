# pfs

![node version](https://img.shields.io/badge/node-%3E%3D0.12.18-brightgreen.svg)
[![travis-ci build status](https://api.travis-ci.org/chrisdothtml/pfs.svg?branch=master)](https://travis-ci.org/chrisdothtml/pfs/branches)
[![StandardJS](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> A dependency-free, promise wrapper around [fs](https://nodejs.org/dist/latest-v9.x/docs/api/fs.html)

## Install

```bash
$ yarn add pfs

# or npm
$ npm install --save pfs
```

## Use

Exactly how you would use `fs`. This is a drop-in replacement that converts any callback-based functions to promises

```javascript
const fs = require('pfs')

// now uses promise
fs.readFile('my-file.txt', 'utf-8')
  .then(...)
  .catch(...)

// still works the same
fs.readFileSync('my-file.txt', 'utf-8')

// properties are also unchanged
fs.constants.R_OK
```

## License

[MIT](LICENSE)
