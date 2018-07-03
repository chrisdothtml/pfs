function promisify (parent, key) {
  return function () {
    var args = Array.prototype.slice.call(arguments)

    return new Promise(function (resolve, reject) {
      parent[key].apply(
        parent,
        args.concat(function (error, result) {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
      )
    })
  }
}

function wrapMethod (parent, key) {
  var result = promisify(parent, key)

  // wrap nested methods (e.g. fs.realpath.native)
  Object.keys(parent[key])
    .filter(function (childKey) {
      return typeof parent[key][childKey] === 'function'
    })
    .forEach(function (childKey) {
      result[childKey] = wrapMethod(parent[key], childKey)
    })

  return result
}

module.exports = (function () {
  var fs = require('fs')

  return Object.keys(fs)
    .reduce(function (pfs, key, i, keys) {
      // only wrap methods with a `Sync` counterpart
      var isWrappable = fs[key] && ~keys.indexOf(key + 'Sync')

      pfs[key] = isWrappable ? wrapMethod(fs, key) : fs[key]
      return pfs
    }, {})
})()
