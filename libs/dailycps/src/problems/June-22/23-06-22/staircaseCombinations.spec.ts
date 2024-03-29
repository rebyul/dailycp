import {
  dpStaircaseCombinations,
  recursiveStaircaseCombinations,
} from './staircaseCombinations';

describe('Staircase combinations', () => {
  test.each([
    [2, [1, 2], [[1, 1], [2]]],
    [
      4,
      [1, 2],
      [
        [1, 1, 1, 1],
        [2, 1, 1],
        [1, 2, 1],
        [1, 1, 2],
        [2, 2],
      ],
    ],
  ])(
    '.recursiveStaircaseCombinations(%d) returns %p',
    (steps, possibleSteps, output) => {
      expect(recursiveStaircaseCombinations(steps, possibleSteps)).toEqual(
        expect.arrayContaining(output)
      );
      expect(
        recursiveStaircaseCombinations(steps, possibleSteps)
      ).not.toBeNull();

      expect(output).toEqual(
        expect.arrayContaining(
          recursiveStaircaseCombinations(steps, possibleSteps)!
        )
      );
    }
  );

  test.each([
    [2, [1], [[1, 1]]],
    [2, [1, 2], [[1, 1], [2]]],
    [
      4,
      [1, 2],
      [
        [1, 1, 1, 1],
        [2, 1, 1],
        [1, 2, 1],
        [1, 1, 2],
        [2, 2],
      ],
    ],
  ])(
    '.dpStaircaseCombinations(%d) returns %p',
    (steps, possibleSteps, output) => {
      expect(dpStaircaseCombinations(steps, possibleSteps)).toEqual(
        expect.arrayContaining(output)
      );

      expect(output).toEqual(
        expect.arrayContaining(dpStaircaseCombinations(steps, possibleSteps))
      );
    }
  );
});
