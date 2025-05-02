/**
 * This problem was asked by Google.

Given the root of a binary search tree, and a target K, return two nodes in the tree whose sum equals K.

For example, given the following tree and K of 20

    10
   /   \
 5      15
       /  \
     11    15
Return the nodes 5 and 15.
*/

import { type BinaryNode } from '../../../lib';

export function treeSums(
  rootNode: BinaryNode,
  target: number
): [number, number] | null {
  // Keep set of traversed nodes to check compliments
  const traversedSet: Set<number> = new Set();
  return treeSumsWithComplimentSet(rootNode, target, traversedSet);
}

function treeSumsWithComplimentSet(
  node: BinaryNode,
  target: number,
  traversedSet: Set<number>
): [number, number] | null {
  const compliment = target - node.value;
  if (traversedSet.has(compliment)) {
    return [node.value, compliment];
  }

  traversedSet.add(node.value);

  if (node.left === undefined && node.right === undefined) {
    return null;
  }

  if (node.left) {
    const leftResult = treeSumsWithComplimentSet(
      node.left,
      target,
      traversedSet
    );
    if (leftResult !== null) {
      return leftResult;
    }
  }
  if (node.right) {
    const rightResult = treeSumsWithComplimentSet(
      node.right,
      target,
      traversedSet
    );
    if (rightResult !== null) {
      return rightResult;
    }
  }

  return null;
}
