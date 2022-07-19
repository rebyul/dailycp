import { createPowerSet } from './powerSets';

describe('Power sets', () => {
  test.each([
    [
      new Set<number>([1, 2, 3]),
      new Set<Set<number>>([
        new Set([]),
        new Set([1]),
        new Set([2]),
        new Set([3]),
        new Set([1, 2]),
        new Set([1, 3]),
        new Set([2, 3]),
        new Set([1, 2, 3]),
      ]),
    ],
  ])('.createPowerSet(%p) returns %p', (set, result) => {
    const returnValueKeysArray = [...createPowerSet(set).values()].map((s) => {
      return [...s.keys()];
    });

    expect(returnValueKeysArray).toHaveLength([...result.values()].length);
    expect(returnValueKeysArray).toEqual(
      expect.arrayContaining([...result].map((s) => [...s.keys()]))
    );
  });
});
