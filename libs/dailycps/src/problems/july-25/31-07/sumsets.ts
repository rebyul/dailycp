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
  if (multiset.length < 2) {
    return false;
  }

  const total = sumArray(multiset);
  if (total % 2 !== 0) {
    return false;
  }

  const targetSum = total / 2;

  const possibleSums = new Map<number, number[]>([[0, []]]);

  for (const num of multiset) {
    const newSums: [number, number[]][] = [];
    for (const [sum, sumSet] of possibleSums) {
      newSums.push([sum + num, [...sumSet, num]]);
    }

    for (const newSum of newSums) {
      possibleSums.set(newSum[0], newSum[1]);
    }

    if (possibleSums.has(targetSum)) {
      return true;
    }
  }

  const hasSum = possibleSums.has(targetSum);
  return hasSum;
}

function sumArray(set: number[]) {
  return set.reduce((a, c) => a + c, 0);
}
