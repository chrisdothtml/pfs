const fs = require('fs');

const promisify = (parent, key) =>
  function() {
    const args = Array.prototype.slice.call(arguments);

    return new Promise((resolve, reject) => {
      parent[key].apply(
        parent,
        args.concat((error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        })
      );
    });
  };


const wrapMethod = (parent, key) => {
  if (typeof parent[key] === 'function') {
    const wrapped = promisify(parent, key);

  // wrap nested methods (e.g. fs.realpath.native)
    Object.keys(parent[key])
      .filter((childKey) => typeof parent[key][childKey] === 'function')
      .forEach((childKey) => wrapped[childKey] = wrapMethod(parent[key], childKey));

    return wrapped;
  }

  return parent[key];
};

module.exports = (() =>
  Object.keys(fs)
    .reduce((pfs, key, i, keys) => {
      pfs[key] = keys.includes(`${key}Sync`) ? wrapMethod(fs, key) : fs[key];
      return pfs;
    }, {})
)();
