/**
 * This problem was asked by Google.

The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.

For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.

You may also use a list or array to represent a set.
 */

export function createPowerSet(set: Set<number>): Set<Set<number>> {
  const result: Set<Set<number>> = new Set(new Set([]));
  result.add(new Set([]));
  [...helper(set).values()].forEach((v) => result.add(v));

  return result;
}

function helper(set: Set<number>): Set<Set<number>> {
  const result: Set<Set<number>> = new Set(),
    copy = new Set(set);
  let iter = copy.values().next();

  while (iter && !iter.done) {
    result.add(new Set([iter.value]));

    // Remove added result
    copy.delete(iter.value);

    const suffixes = helper(copy);

    for (const v of suffixes.values()) {
      result.add(new Set([iter.value, ...v.values()]));
    }

    iter = copy.values().next();
  }
  return result;
}
