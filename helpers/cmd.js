const validateConfig = require('../validatiors/index');

const getOptions = () => {
  if (process.argv.length === 2) {
    throw Error('Config is required');
  }

  const options = {};
  const args = process.argv.splice(2);

  if (args.filter((item) => item.toLowerCase() === '-c').length === 0) {
    throw Error('Config is required');
  }

  if (args.length % 2 !== 0) {
    throw Error('wrong config');
  }

  const map = {
    '-c': 'config',
    '-i': 'input',
    '-o': 'output',
  };

  for (let i = 0; i < args.length; i += 2) {
    const option = map[args[i].toLowerCase()];

    if (option && options[option]) {
      throw Error('Duplicated options');
    }

    if (option) {
      options[option] = args[i + 1];
    }
  }

  validateConfig(options);

  return options;
}

module.exports = getOptions;