/**
 * This problem was asked by Facebook.

Given a multiset of integers, return whether it can be partitioned into two
subsets whose sums are the same.

For example, given the multiset {15, 5, 20, 10, 35, 15, 10}, it would return
true, since we can split it up into {15, 5, 10, 15, 10} and {20, 35}, which
both add up to 55.

Given the multiset {15, 5, 20, 10, 35}, it would return false, since we can't
split it up into two subsets that add up to the same sum.
*/

export function hasSumset(multiset: number[]): boolean {
  const total = sum(multiset);
  if (total % 2 !== 0) {
    return false;
  }

  const targetSum = total / 2;

  const possibleSums = new Set<number>([0]);

  for (const num of multiset) {
    const newSums = [];
    for (const sum2 of possibleSums) {
      newSums.push(sum2 + num);
    }

    for (const newSum of newSums) {
      possibleSums.add(newSum);
    }

    if (possibleSums.has(targetSum)) {
      return true;
    }
  }

  return possibleSums.has(targetSum);
}

function sum(set: number[]) {
  return set.reduce((a, c) => a + c, 0);
}
