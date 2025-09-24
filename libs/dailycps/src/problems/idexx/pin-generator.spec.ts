import { generatePins } from './pin-generator';
describe('pin generator', () => {
  test('negative batch size throw error', () => {
    expect(() => {
      generatePins(-1);
    }).toThrow('negative batch size');
  });

  test('batch size over max safe int throw error', () => {
    expect(() => {
      generatePins(Number.MAX_SAFE_INTEGER + 1);
    }).toThrow('max size exceeded');
  });

  test('batch size zero returns empty set', () => {
    const resultSet = generatePins(0);
    expect(resultSet.size).toEqual(0);
  });

  test('batch size 1 returns size 1 set', () => {
    const resultSet = generatePins(1);
    expect(resultSet.size).toEqual(1);
    for (const pin of resultSet) {
      checkPinIs4Digits(pin);
    }
  });

  test('batch size 1000 returns size 1000 set', () => {
    const resultSet = generatePins(1000);
    expect(resultSet.size).toEqual(1000);
    for (const pin of resultSet) {
      checkPinIs4Digits(pin);
    }
  });
});

function checkPinIs4Digits(pin: string) {
  return pin.length === 4;
}
