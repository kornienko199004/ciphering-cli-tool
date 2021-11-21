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

  test('Throw an error on getting config ast from incorrect config', () => {
    expect(() => {
      getConfigAst('C1-A-R0-P1');
    }).toThrow(Error("wrong config"));
  });
});