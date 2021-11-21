const getOptions = require('./helpers/cmd');
const cli = require('./tool');

(async () => {
  let config;
  try {
    config = getOptions();
  } catch (error) {
    process.stderr.write(error?.message);
    process.exit(1);
  }
  await cli(config);
});