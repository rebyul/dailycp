import { MapSolution, SortingSolution } from './majorityElement';

describe('Majority element', () => {
  test.each([
    [[1, 1, 2, 1, 3, 5, 1], 1],
    [[7], 7],
    [[2, 13], -1],
  ])('Map solution: Find majority element in %p returns %s', (arr, outcome) => {
    const solution = new MapSolution();
    expect(solution.majorityElement(arr)).toEqual(outcome);
  });
  test.each([
    [[1, 1, 2, 1, 3, 5, 1], 1],
    [[7], 7],
    [[2, 13], -1],
  ])(
    'Sorting solution: Find majority element in %p returns %s',
    (arr, outcome) => {
      const solution = new SortingSolution();
      expect(solution.majorityElement(arr)).toEqual(outcome);
    }
  );
});
