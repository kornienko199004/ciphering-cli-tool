const { pipeline } = require('stream');
const getOptions = require('./helpers/cmd');
const getInputStream = require('./streams/input-stream');
const getTransformStream = require('./streams/transform-stream');
const getOutputStream = require('./streams/output-stream');

const main = () => {
  const config = getOptions();
  pipeline(
    getInputStream(config),
    getTransformStream(config),
    getOutputStream(config),
    (err) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log('all right');
    }
  
  );
};

main();