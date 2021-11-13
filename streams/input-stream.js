const fs = require('fs');
const path = require('path');

const getReadFileStream = (src) => {
  const dirPath = path.join(src);
  const stream = fs.createReadStream(dirPath);
  return stream;
};

const getInputStream = ({ input }) => {
  if (input) {
    return getReadFileStream(input);
  }
  return process.stdin;
};

module.exports = (config) => getInputStream(config);