import { firstMissingInteger } from './firstMissingInteger';

describe('First missing integer', () => {
  test.each([
    [[3, 4, -1, 1], 2],
    [[1, 2, 0], 3],
    [[3, 4, 0], 1],
  ])('.firstMissingInteger(%p) returns %p', (input, output) => {
    expect(firstMissingInteger(input)).toEqual(output);
  });
});
