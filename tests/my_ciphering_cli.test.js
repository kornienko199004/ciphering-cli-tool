const mockArgv = require('mock-argv');

jest.mock('fs', () => {
  const fs = jest.requireActual('fs');
  const unionfs = require('unionfs').default;
  return unionfs.use(fs);
});

const getOptions = require('../helpers/cmd');
const cli = require('../tool/index');
const Volume = require('memfs').Volume;
const vol = Volume.fromJSON({
  'input.txt': '',
  'output.txt': '',
});
const fsMocked = require('fs');
const fs = fsMocked.use(vol);

beforeEach(() => {
  jest.resetAllMocks();
});

const TESTING_STRING = 'This is secret. Message about "_" symbol!';

describe('Error scenarios', () => {
  test('User passes the same cli argument twice', () => {
    mockArgv(['-c', 'C1', '-c', 'C1'], () => {
      expect(() => {
        getOptions();
      }).toThrow(Error('Duplicated options'));
    });
  });

  test("User doesn't pass -c argument", () => {
    mockArgv(['-i', './text.txt', '-o', './output.txt'], () => {
      expect(() => {
        getOptions();
      }).toThrow(Error('Config is required'));
    });
  });

  test("User passes -i argument with path that doesn't exist or with no read access", async () => {
    mockArgv(['-c', 'c1', '-i', './input1.txt', '-o', './output.txt'], () => {
      expect(() => {
        getOptions();
      }).toThrow(Error("Input file doesn't exist"));
    });
  });

  test("User passes -i argument with path that doesn't exist or with no read access", async () => {
    mockArgv(['-c', 'c1', '-i', 'input.txt', '-o', 'output1.txt'], () => {
      expect(() => {
        getOptions();
      }).toThrow(Error("Output file doesn't exist"));
    });
  });

  test('User passes incorrect symbols in argument for -c', async () => {
    mockArgv(['-c', 'c1-d3'], () => {
      expect(() => {
        getOptions();
      }).toThrow(Error('wrong config'));
    });
  });
});

describe('Success scenarios', () => {
  test('User passes correct sequence of symbols as argument for --config that matches regular expression', async () => {
    mockArgv(['-c', 'c1-c0-a-r1-r0'], () => {
      expect(() => {
        getOptions();
      }).not.toThrow(Error('wrong config'));
    });
  });

  test('The first task example', () => {
    vol.writeFileSync('input.txt', TESTING_STRING);

    const config = {
      config: 'C1-C1-R0-A',
      input: 'input.txt',
      output: 'output.txt',
    };
    const pr = () =>
      cli(config).then(() => {
        outputFile = fs.readFileSync('output.txt', { encoding: 'utf8' });
        return outputFile;
      });
    return expect(pr()).resolves.toBe(
      'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!'
    );
  });

  test('The second task example', () => {
    vol.writeFileSync('input.txt', TESTING_STRING);

    const config = {
      config: 'C1-C0-A-R1-R0-A-R0-R0-C1-A',
      input: 'input.txt',
      output: 'output.txt',
    };
    const pr = () =>
      cli(config).then(() => {
        outputFile = fs.readFileSync('output.txt', { encoding: 'utf8' });
        return outputFile;
      });
    return expect(pr()).resolves.toBe(
      'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!'
    );
  });

  test('The third task example', () => {
    vol.writeFileSync('input.txt', TESTING_STRING);

    const config = {
      config: 'A-A-A-R1-R0-R0-R0-C1-C1-A',
      input: 'input.txt',
      output: 'output.txt',
    };
    const pr = () =>
      cli(config).then(() => {
        outputFile = fs.readFileSync('output.txt', { encoding: 'utf8' });
        return outputFile;
      });
    return expect(pr()).resolves.toBe(
      'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!'
    );
  });

  test('The fourth task example', () => {
    vol.writeFileSync('input.txt', TESTING_STRING);

    const config = {
      config: 'C1-R1-C0-C0-A-R0-R1-R1-A-C1',
      input: 'input.txt',
      output: 'output.txt',
    };
    const pr = () =>
      cli(config).then(() => {
        outputFile = fs.readFileSync('output.txt', { encoding: 'utf8' });
        return outputFile;
      });
    return expect(pr()).resolves.toBe(TESTING_STRING);
  });
});
