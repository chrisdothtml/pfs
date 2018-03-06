function getWrappableMethods (fs) {
  var syncPattern = /Sync$/
  var result = []
  var key

  for (key in fs) {
    if (fs.hasOwnProperty(key) && syncPattern.test(key)) {
      result.push(key.slice(0, -4))
    }
  }

  return result
}

function wrapMethod (parent, key) {
  return function () {
    var args = Array.prototype.slice.call(arguments)

    return new Promise(function (resolve, reject) {
      parent[key].apply(
        parent,
        // callback
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

module.exports = (function () {
  var fs = require('fs')
  var wrappableMethods = getWrappableMethods(fs)
  var result = {}
  var isWrappable, key

  for (key in fs) {
    if (fs.hasOwnProperty(key)) {
      isWrappable = ~wrappableMethods.indexOf(key)
      result[key] = isWrappable ? wrapMethod(fs, key) : fs[key]
    }
  }

  return result
})()
