# pfs

[![NPM](https://nodei.co/npm/@haensl%2Fpfs.png?downloads=true)](https://nodei.co/npm/@haensl%2pfs/)

[![npm version](https://badge.fury.io/js/@haensl%2Fpfs.svg)](http://badge.fury.io/js/@haensl%2Fpfs)

[![CircleCI](https://circleci.com/gh/haensl/pfs.svg?style=svg)](https://circleci.com/gh/haensl/pfs)

Lightweight, dependency-free, promise wrapper around node.js' [fs](https://nodejs.org/dist/latest-v9.x/docs/api/fs.html).

## Installation

```bash
$ yarn add @haensl/pfs

# or npm
$ npm install -S @haensl/pfs
```

## Use

Exactly how you would use `fs`. This is a drop-in replacement that converts any callback-based functions to promise-based ones.

```javascript
const fs = require('@haensl/pfs')

// now uses promise
fs.readFile('my-file.txt', 'utf-8')
  .then((content) => {
    // do nice things
  })
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
