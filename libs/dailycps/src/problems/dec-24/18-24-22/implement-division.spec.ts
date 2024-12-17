import { divide } from './implement-division';

describe('Implement division', () => {
  test.each([
    [5, 3, 1],
    [2, 1, 2],
    [98234729387, 234, 419806535],
  ])(
    'divide %s by %s returns %s as quotient',
    (denominator, nominator, quotient) => {
      expect(divide(denominator, nominator)).toEqual(quotient);
    }
  );
});
