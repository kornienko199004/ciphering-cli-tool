const ciphers = require('../../ciphers/index');
const config = require('./config');

const rotate = ciphers('rotate');

const ROTATE_TESTING_STRING = 'abcdef';          // ABCDEF GHIJKLMNOPQRSTUVWXYZ
const ROTATE_ENCODE_STRING = 'ijklmn';  // ABCDEFGH IJKLMN OPQRSTUVWXYZ

describe("Rotate Cipher", () => {

  test('Rotate Encode', () => {
    expect(rotate(ROTATE_TESTING_STRING, config.ENCODE_MODE)).toBe(ROTATE_ENCODE_STRING);
  });

  test('Rotate Decode', () => {
    expect(rotate(ROTATE_ENCODE_STRING, config.DECODE_MODE)).toBe(ROTATE_TESTING_STRING);
  });
});