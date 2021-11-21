const { Transform } = require('stream');
const getCipher = require('../ciphers');
const getConfigAst = require('../helpers/configAst');

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

const getTransformStream = ({ config }) => {
  const optionsAst = getConfigAst(config);
  return new CipherTransform(optionsAst);
};

module.exports = (config) => getTransformStream(config);