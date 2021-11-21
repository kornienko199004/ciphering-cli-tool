const fs = require('fs');
const path = require('path');

const getReadFileStream = (src) => {
  const dirPath = path.join(src);
  const stream = fs.createReadStream(dirPath);
  return stream;
};

const getInputStream = (config) => {
  if (config?.input) {
    return getReadFileStream(config?.input);
  }
  return process.stdin;
};

module.exports = (config) => getInputStream(config);