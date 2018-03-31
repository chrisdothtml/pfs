# fs.promise

[![NPM](https://nodei.co/npm/fs.promise.png?downloads=true)](https://nodei.co/npm/fs.promise/)

[![npm version](https://badge.fury.io/js/fs.promise.svg)](http://badge.fury.io/js/fs.promise)
[![travis-ci build status](https://api.travis-ci.org/haensl/fs.promise.svg?branch=master)](https://travis-ci.org/haensl/fs.promise/branches)

Lightweight, dependency-free, promise wrapper around node.js' [fs](https://nodejs.org/dist/latest-v9.x/docs/api/fs.html).

## Installation

```bash
$ yarn add fs.promise

# or npm
$ npm install --save fs.promise
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
