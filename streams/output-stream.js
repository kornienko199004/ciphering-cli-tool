const fs = require('fs');
const path = require('path');

const getWriteFileStream = (src) => {
  const dirPath = path.join(src);
  const stream = fs.createWriteStream(dirPath);
  return stream;
};

const getOutputStream = ({ output }) => {
  if (output) {
    return getWriteFileStream(output);
  }
  return process.stdout;
};

module.exports = (config) => getOutputStream(config);