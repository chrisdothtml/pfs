var utils = require('./utils.js')

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
  var originalMethod = parent[key]
  var result = utils.promisify(parent, key)
  var ownProps = utils.getOwnProps(originalMethod)
  var i, prop

  if (ownProps.length) {
    for (i = 0; i < ownProps.length; i++) {
      prop = ownProps[i]

      if (typeof originalMethod[prop] === 'function') {
        result[prop] = wrapMethod(originalMethod[prop])
      }
    }
  }

  return result
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
