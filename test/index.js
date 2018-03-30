const deepKeys = require('deep-keys');
const assert = require('assert');
const pfs = require('../index.js');
const testRunner = require('./_runner.js');
const fs = require('fs');
const test = testRunner.test;
const meta = require('../package');
const path = require('path');
const pkgPath = path.join(__dirname, '../package.json');

test(() => {
  assert.deepEqual(
    deepKeys(pfs),
    deepKeys(fs),
    'keys deep match fs keys'
  )
});

(() => {
  test(() =>
    pfs.readFile(pkgPath, 'utf-8')
      .then((pkgContent) => {
        const pkg = JSON.parse(pkgContent)
        assert.ok(
          (pkg.name === meta.name),
          'provides callback-based methods as promises'
        );
      })
  );

  test(() => {
    const pkgContent = pfs.readFileSync(pkgPath, 'utf-8');
    const pkg = JSON.parse(pkgContent);

    assert.ok(
      (pkg.name === meta.name),
      'provides non-callback-based methods unchanged'
    );
  });
})();

test(() => {
  const fakePath = 'file-that-doesnt-exist.txt'

  return pfs.readFile(fakePath, 'utf-8')
    .catch((error) => error)
    .then((error) =>
      assert.ok(
        (error.path === fakePath),
        'rejects the promise if an error is provided'
      )
    );
});

testRunner.run()
