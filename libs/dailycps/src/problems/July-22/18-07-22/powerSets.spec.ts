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
    const returnValue = [...createPowerSet(set).values()];

    expect(returnValue).toHaveLength([...result.values()].length);
    expect(returnValue).toEqual(expect.arrayContaining([...result.values()]));
  });
});
