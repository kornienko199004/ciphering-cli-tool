const fs = require('fs');
const path = require('path');
const getConfigAst = require('../helpers/configAst');

const validateInput = (src) => {
  try {
    const dirPath = path.join(src);
    if (!fs.existsSync(dirPath)) {
      throw Error();
    }
  } catch(err) {
    throw Error('Input file doesn\'t exist');
  }
};

const validateOutput = (src) => {
  try {
    const dirPath = path.join(src);
    if (!fs.existsSync(dirPath)) {
      throw Error();
    }
  } catch(err) {
    throw Error('Output file doesn\'t exist');
  }
};

const validateConfig = (str) => {
  getConfigAst(str);
};

const validateOptions = (config) => {
  if (config.hasOwnProperty('input')) {
    validateInput(config.input);
  }

  if (config.hasOwnProperty('output')) {
    validateOutput(config.output);
  }

  if (config.hasOwnProperty('config')) {
    validateConfig(config.config);
  }
};

module.exports = validateOptions;