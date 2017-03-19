const path = require('path');

const buildDev = require('./buildScripts/dev.js');
const buildProd = require('./buildScripts/prod.js');

module.exports = (env) => {
  const outputPath = path.join(__dirname, `output/${env}`);
  switch (env) {
    case 'dev':
      return buildDev(env, path, outputPath);

    case 'prod':
      return buildProd(env, path, outputPath);

    default:
      throw new Error(`Bad environment! env=$env`);
  }
};
