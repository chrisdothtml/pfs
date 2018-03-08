/* eslint-env mocha */

var expect = require('chai').expect
var fs = require('fs')
var meta = require('../package.json')
var path = require('path')
var pfs = require('../lib/index.js')

describe('pfs', function () {
  it('deep matches fs keys', function () {
    expect(pfs).to.have.deep.keys(fs)
  })

  ;(function () {
    var pkgPath = path.join(__dirname, '../package.json')

    it('provides callback-based methods as promises', function () {
      return pfs.readFile(pkgPath, 'utf-8')
        .then(function (pkgContent) {
          var pkg = JSON.parse(pkgContent)

          expect(pkg.name).to.equal(meta.name)
        })
    })

    it('provides non-callback-based methods unchanged', function () {
      var pkgContent = pfs.readFileSync(pkgPath, 'utf-8')
      var pkg = JSON.parse(pkgContent)

      expect(pkg.name).to.equal(meta.name)
    })
  })()
})
