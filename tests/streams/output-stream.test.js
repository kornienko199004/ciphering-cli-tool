const { Writable } = require('stream');
const getOutputStream = require('../../streams/output-stream');

describe('Input stream', () => {
  test('Should return file write stream', () => {
    let stream = getOutputStream();
    expect(stream instanceof Writable).toBe(true);
  });
});