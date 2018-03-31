# fs.promise

[![NPM](https://nodei.co/npm/@haensl/fs.promise.png?downloads=true)](https://nodei.co/npm/@haensl/pfs/)

![node version](https://img.shields.io/badge/node-%3E%3D0.12.18-brightgreen.svg)
[![travis-ci build status](https://api.travis-ci.org/haensl/pfs.svg?branch=master)](https://travis-ci.org/haensl/pfs/branches)

Lightweight, dependency-free, promise wrapper around node's [fs](https://nodejs.org/dist/latest-v9.x/docs/api/fs.html)

## Installation

```bash
$ yarn add pfs

# or npm
$ npm install --save pfs
```

## Use

Exactly how you would use `fs`. This is a drop-in replacement that converts any callback-based functions to promise-based ones.

```javascript
const fs = require('fs.promise')

// now uses promise
fs.readFile('my-file.txt', 'utf-8')
  .then(...)
  .catch(...)

// still works the same
fs.readFileSync('my-file.txt', 'utf-8')

// properties are also unchanged
fs.constants.R_OK
```

## Credits

Based on [Chris Deacy's pfs](https://github.com/chrisdothtml/pfs).

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
