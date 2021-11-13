const { Transform } = require('stream');
const getCipher = require('../ciphers');

class CipherTransform extends Transform {
  optionsAst;

  constructor(optionsAst) {
    super();
    this.optionsAst = optionsAst;
  }

  _transform(chunk, encoding, callback) {
    try {
      let resultString = chunk.toString('utf8');

      for (let i = 0; i < this.optionsAst.length; i += 1) {
        const { cipher, mode } = this.optionsAst[i];
        resultString = getCipher(cipher)(resultString, mode);
      }

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}
const cipherMap = {
  c: 'caesar',
  r: 'rotate',
};

const getTransformStream = ({ config }) => {
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
  return new CipherTransform(optionsAst);
};

module.exports = (config) => getTransformStream(config);