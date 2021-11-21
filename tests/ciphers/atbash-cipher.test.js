const ciphers = require('../../ciphers/index');

const atbash = ciphers('atbash');

const ATBASH_TESTING_STRING = 'abcdefghijklmnopqrstuvwxyz';          // ABCDEF GHIJKLMNOPQRSTUVWXYZ
const ATBASH_ENCODE_STRING = 'zyxwvutsrqponmlkjihgfedcba';  // ABCDEFGH IJKLMN OPQRSTUVWXYZ

describe("Atbash Cipher", () => {

  test('Atbash Encode', () => {
    expect(atbash(ATBASH_TESTING_STRING)).toBe(ATBASH_ENCODE_STRING);
  });

  test('Atbash Decode', () => {
    expect(atbash(ATBASH_ENCODE_STRING)).toBe(ATBASH_TESTING_STRING);
  });
});