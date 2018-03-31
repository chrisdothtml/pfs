const deepKeys = require('deep-keys');
const assert = require('assert');
const pfs = require('../index.js');
const fs = require('fs');
const meta = require('../package');
const path = require('path');
const pkgPath = path.join(__dirname, '../package.json');

describe('When initializing the module', () => {
  it('keys deep match fs keys', () => {
    assert.deepEqual(
      deepKeys(pfs),
      deepKeys(fs),
      'keys deep match fs keys'
    );
  });
});

describe('When reading a file', () => {
  let contents;

  describe('and using a callback based function', () => {
    describe('and providing a valid path', () => {
      beforeEach((done) => {
        pfs.readFile(pkgPath, 'utf-8')
          .then((pkgContent) => {
            contents = JSON.parse(pkgContent);
            done();
          });
      });

      it('resolves with the correct data', () => {
        assert.ok(
          (contents.name === meta.name),
          'provides callback-based methods as promises'
        );
      });
    });

    describe('and providing an invalid path', () => {
      let error;
      beforeEach((done) => {
        pfs.readFile('non-existent-file', 'utf-8')
          .catch((err) => {
            error = err;
            done();
          });
      });

      it('rejects with an error', () => {
        assert.ok(
          (error instanceof Error),
          'rejects with an error'
        );
      });
    });
  });

  describe('and using a non-callback based function', () => {
    beforeEach(() => {
      contents = JSON.parse(pfs.readFileSync(pkgPath, 'utf8'));
    });

    it('provides non-callback-based functions unchanged', () => {
      assert.ok(
        (contents.name === meta.name),
        'provides callback-based methods as promises'
      );
    });
  });
});
