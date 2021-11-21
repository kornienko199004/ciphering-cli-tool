const lowLetterHashMap = createHashMap('a'.charCodeAt(), 'z'.charCodeAt());
const highLetterHashMap = createHashMap('A'.charCodeAt(), 'Z'.charCodeAt());

function createHashMap(min, max) {
  const hashMap = new Map();
  for (let i = min; i <= max; i += 1) {
    hashMap.set(i, true);
  }

  return hashMap;
};

const getCharCode = (min, max, code) => {
  if (code > max) {
    code = (code % max) + min - 1;
  } else if (code < min) {
    code = max - (min % code) + 1;
  }

  return code;
};

const getCipheredChar = (char, dif) => {
  let code = char.charCodeAt();

  if (lowLetterHashMap.has(code)) {
    code += dif;
    const min = 'a'.charCodeAt();
    const max = 'z'.charCodeAt();
    code = getCharCode(min, max, code);
    return String.fromCharCode(code);
  }

  if (highLetterHashMap.has(code)) {
    code += dif;
    const min = 'A'.charCodeAt();
    const max = 'Z'.charCodeAt();
    code = getCharCode(min, max, code);
    return String.fromCharCode(code);
  }

  return char;
};

const getAtbashedChar = (char) => {
  let code = char.charCodeAt();
  if (!lowLetterHashMap.has(code) && !highLetterHashMap.has(code)) {
    return char;
  }

  let dif, min, max;

  if (lowLetterHashMap.has(code)) {
    min = 'a'.charCodeAt();
    max = 'z'.charCodeAt();
  }

  if (highLetterHashMap.has(code)) {
    min = 'A'.charCodeAt();
    max = 'Z'.charCodeAt();
  }

  dif = code - min;
  code = max - dif;
  return String.fromCharCode(code);
};

const caesarCipher = (str, mode) => {
  if (!str || str.length === 0) {
    return;
  }

  const dif = parseInt(mode) === 1 ? 1 : -1;
  let result = '';

  for (let i = 0; i < str.length; i += 1) {
    result += getCipheredChar(str[i], dif);
  }
  return result;
};

const rotCipher = (str, mode) => {
  if (!str || str.length === 0) {
    return;
  }

  const dif = parseInt(mode) === 1 ? 8 : -8;
  let result = '';

  for (let i = 0; i < str.length; i += 1) {
    result += getCipheredChar(str[i], dif);
  }
  return result;
};

const atbash = (str) => {
  if (!str || str.length === 0) {
    return;
  }

  let result = '';

  for (let i = 0; i < str.length; i += 1) {
    result += getAtbashedChar(str[i]);
  }
  return result;
};

module.exports = (cipher) => {
  return {
    caesar: caesarCipher,
    rotate: rotCipher,
    atbash,
  }[cipher];
}
