const ciphers = require('../../ciphers/index');
const config = require('./config');

const caesar = ciphers('caesar');

const TESTING_STRING = 'abcdef';
const ENCODE_STRING = 'bcdefg';

describe("Caesar Cipher", () => {

  test('caesarCipher Encode', () => {
    expect(caesar(TESTING_STRING, config.ENCODE_MODE)).toBe(ENCODE_STRING);
  });

  test('caesarCipher Decode', () => {
    expect(caesar(ENCODE_STRING, config.DECODE_MODE)).toBe(TESTING_STRING);
  });
});