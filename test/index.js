const deepKeys = require('deep-keys')
const assert = require('assert')
const pfs = require('../index.js')
const testRunner = require('./_runner.js')

const test = testRunner.test

test(function () {
  const fs = require('fs')

  assert.deepEqual(
    deepKeys(pfs),
    deepKeys(fs),
    'keys deep match fs keys'
  )
})

;(function () {
  const meta = require('../package.json')
  const path = require('path')
  const pkgPath = path.join(__dirname, '../package.json')

  test(function () {
    return pfs.readFile(pkgPath, 'utf-8')
      .then(function (pkgContent) {
        const pkg = JSON.parse(pkgContent)

        assert.ok(
          (pkg.name === meta.name),
          'provides callback-based methods as promises'
        )
      })
  })

  test(function () {
    const pkgContent = pfs.readFileSync(pkgPath, 'utf-8')
    const pkg = JSON.parse(pkgContent)

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
