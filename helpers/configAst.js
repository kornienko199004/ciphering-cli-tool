const cipherMap = {
  c: 'caesar',
  r: 'rotate',
};

const getConfigAst = (config) => {
  let optionsAst = [];
  if (config) {
    const options = config.split('-');
    optionsAst = options.reduce((acc, item) => {
      if (item.length === 1 && item.toLowerCase() === 'a') {
        return [ ...acc, { cipher: 'atbash' } ];
      }

      if (item.length === 2) {
        const [cipher, mode] = item.toLowerCase().split('');
        if (cipherMap[cipher] && (parseInt(mode) === 0 || parseInt(mode) === 1)) {
          return [ ...acc, { cipher: cipherMap[cipher], mode } ];
        }
      }

      throw Error('wrong config');
    }, []);
  }

  return optionsAst;
}

module.exports = getConfigAst;