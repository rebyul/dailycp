import { canSum } from './canSum';
describe('Can sum', () => {
  test.each([
    [7, [3, 4], true],
    [7, [3, 2], true],
    [8, [1, 6, 36, 8, 99, 47], true],
    [8, [1, 3, 5], true],
    [300, [7, 14], false],
  ])('.canSum(%d, %p)', (sum, numbers, output) => {
    expect(canSum(sum, numbers)).toEqual(output);
  });
});
