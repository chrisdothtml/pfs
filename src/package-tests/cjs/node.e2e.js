const fs = require('@haensl/pfs');

fs.readFile('./package.json', 'utf8')
  .then((contents) => {
    console.info(contents); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
