# p-fs

> A dependency-free, promise wrapper around [fs](https://nodejs.org/dist/latest-v9.x/docs/api/fs.html)

## Install

```bash
$ yarn add p-fs

# or npm
$ npm install --save p-fs
```

## Use

Exactly how you would use `fs`. This is a drop-in replacement that converts any callback-based functions to promises

```javascript
const fs = require('p-fs')

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
