const fs = require('fs');
const path = require('path');

const getWriteFileStream = (src) => {
  const dirPath = path.join(src);
  const stream = fs.createWriteStream(dirPath);
  return stream;
};

const getOutputStream = (config) => {
  if (config?.output) {
    return getWriteFileStream(config.output);
  }
  return process.stdout;
};

module.exports = (config) => getOutputStream(config);