const { pipeline } = require('stream');
const getInputStream = require('../streams/input-stream');
const getTransformStream = require('../streams/transform-stream');
const getOutputStream = require('../streams/output-stream');

const tool = (config) => new Promise((resolve, reject) => {
  pipeline(
    getInputStream(config),
    getTransformStream(config),
    getOutputStream(config),
    (err) => {
      if (err) {
        process.stderr.write(err?.message);
        reject(process.exit(1));
      }
      resolve();
    }
  );
});

module.exports = tool;