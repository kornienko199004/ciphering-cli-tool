const getConfigAst = require('../../helpers/configAst');

describe("Get config Ast", () => {

  test('Get config ast from correct config', () => {
    const expected = [
      { cipher: 'caesar', mode: '1' },
      { cipher: 'atbash' },
      { cipher: 'rotate', mode: '0' }
    ];
    expect(getConfigAst('C1-A-R0')).toEqual(expected);
  });
});