import { longestConsecutive } from './longest-running-consecutive';

describe('longest running constant', () => {
  test.each([[[100, 4, 200, 1, 3, 2], 4]])(
    'longestConsecutive(%s) returns %d',
    (input, length) => {
      expect(longestConsecutive(input)).toEqual(length);
    }
  );
});
