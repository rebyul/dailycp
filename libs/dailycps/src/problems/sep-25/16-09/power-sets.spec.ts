import {
  createPowerSet as iterativePowerSet,
  recursivePowerSet,
} from './power-sets';

describe('Power sets', () => {
  const testCases: [number[], number[][]][] = [
    [[], [[]]],
    [[1], [[], [1]]],
    [
      [1, 2, 3],
      [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
    ],
    [
      [4, 5, 9],
      [[], [4], [5], [9], [4, 5], [4, 9], [5, 9], [4, 5, 9]],
    ],
    [
      [1, 2, 3, 4, 5],
      [
        [],
        [1],
        [2],
        [3],
        [4],
        [5],
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
        [2, 3],
        [2, 4],
        [2, 5],
        [3, 4],
        [3, 5],
        [4, 5],
        [1, 2, 3],
        [1, 2, 4],
        [1, 2, 5],
        [1, 3, 4],
        [1, 3, 5],
        [1, 4, 5],
        [2, 3, 4],
        [2, 3, 5],
        [2, 4, 5],
        [3, 4, 5],
        [1, 2, 3, 4],
        [1, 2, 3, 5],
        [1, 2, 4, 5],
        [1, 3, 4, 5],
        [2, 3, 4, 5],
        [1, 2, 3, 4, 5],
      ],
    ],
  ];
  test.each(testCases)('iterative: given %p, returns %p', (input, expected) => {
    const result = iterativePowerSet(input);

    expect(result.length).toEqual(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  test.each(testCases)('recursive: given %p, returns %p', (input, expected) => {
    const result = recursivePowerSet(input);

    // console.table(result);
    expect(result.length).toEqual(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});
