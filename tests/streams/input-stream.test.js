const { Readable } = require('stream');
const getInputStream = require('../../streams/input-stream');

describe('Input stream', () => {
  test('Should return file read stream', () => {
    let stream = getInputStream();
    expect(stream instanceof Readable).toBe(true);
  });
});