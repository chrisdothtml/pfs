var assert = require('assert')
var pfs = require('../lib/index.js')
var testRunner = require('./_runner.js')

var test = testRunner.test

test(function () {
  var deepKeys = require('deep-keys')
  var fs = require('fs')

  assert.deepEqual(
    deepKeys(pfs),
    deepKeys(fs),
    'keys deep match fs keys'
  )
})

;(function () {
  var meta = require('../package.json')
  var path = require('path')
  var pkgPath = path.join(__dirname, '../package.json')

  test(function () {
    return pfs.readFile(pkgPath, 'utf-8')
      .then(function (pkgContent) {
        var pkg = JSON.parse(pkgContent)

        assert.ok(
          (pkg.name === meta.name),
          'provides callback-based methods as promises'
        )
      })
  })

  test(function () {
    var pkgContent = pfs.readFileSync(pkgPath, 'utf-8')
    var pkg = JSON.parse(pkgContent)

    assert.ok(
      (pkg.name === meta.name),
      'provides non-callback-based methods unchanged'
    )
  })
})()

test(function () {
  const fakePath = 'file-that-doesnt-exist.txt'

  return pfs.readFile(fakePath, 'utf-8')
    .catch(function (error) {
      return error
    })
    .then(function (error) {
      assert.ok(
        (error.path === fakePath),
        'rejects the promise if an error is provided'
      )
    })
})

testRunner.run()
