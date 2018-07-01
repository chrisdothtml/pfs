const fs = require('fs')

function promisify (parent, key) {
  return function () {
    const args = Array.prototype.slice.call(arguments)

    return new Promise((resolve, reject) => {
      parent[key].apply(
        parent,
        args.concat((error, result) => {
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
  const result = promisify(parent, key)

  // wrap nested methods (e.g. fs.realpath.native)
  Object.keys(parent[key])
    .filter((childKey) => {
      return typeof parent[key][childKey] === 'function'
    })
    .forEach((childKey) => {
      result[childKey] = wrapMethod(parent[key], childKey)
    })

  return result
}

module.exports = (() => {
  return Object.keys(fs)
    .reduce((pfs, key, i, keys) => {
      // only wrap methods with a `Sync` counterpart
      const isWrappable = keys.includes(key + 'Sync')

      pfs[key] = isWrappable ? wrapMethod(fs, key) : fs[key]
      return pfs
    }, {})
})()
