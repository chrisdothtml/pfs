const assert = require('assert')
const deepKeys = require('deep-keys')
const fs = require('fs')
const path = require('path')
const pfs = require('../index.js')
const { test, run: runTests } = require('./_runner.js')

test(() => {
  assert.deepEqual(
    deepKeys(pfs),
    deepKeys(fs),
    'keys deep match fs keys'
  )
})

;(() => {
  const meta = require('../package.json')
  const pkgPath = path.resolve(__dirname, '../package.json')

  test(() => {
    return pfs.readFile(pkgPath, 'utf-8')
      .then((pkgContent) => {
        const pkg = JSON.parse(pkgContent)

        assert.ok(
          (pkg.name === meta.name),
          'provides callback-based methods as promises'
        )
      })
  })

  test(() => {
    const pkgContent = pfs.readFileSync(pkgPath, 'utf-8')
    const pkg = JSON.parse(pkgContent)

    assert.ok(
      (pkg.name === meta.name),
      'provides non-callback-based methods unchanged'
    )
  })
})()

test(() => {
  const fakePath = 'file-that-doesnt-exist.txt'

  return pfs.readFile(fakePath, 'utf-8')
    .catch((error) => {
      return error
    })
    .then((error) => {
      assert.ok(
        (error.path === fakePath),
        'rejects the promise if an error is provided'
      )
    })
})

runTests()
