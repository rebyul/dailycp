import { noOfClassrooms } from './overlappingClasstimes';

describe('Overlapping class times', () => {
  test.each([
    [
      [
        [30, 75],
        [0, 50],
        [60, 150],
      ],
      2,
    ],
  ])('.noOfClassrooms(%p) returns %d', (times, output) => {
    expect(noOfClassrooms(times)).toEqual(output);
  });
});
