import { BinaryNode } from '../../lib/BinaryNode';
/**
 * This problem was asked by Google.

A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.

Given the root to a binary tree, count the number of unival subtrees.

For example, the following tree has 5 unival subtrees:

   0
  / \
 1   0
    / \
   1   0
  / \
 1   1
 */

// This is incorrect as it only checks the left right node values === node.value,
// not if the sub tree as a whole is the same as the root node
export function countUnivalSubtrees(tree?: BinaryNode): number {
  if (!tree) {
    return 0;
  }
  let count = 0;

  // Check if input is unival
  if (
    (!tree.left && !tree.right) ||
    (tree.left?.value === tree.value && tree.right?.value === tree.value)
  ) {
    count++;
  }
  return (
    // DFS
    count + countUnivalSubtrees(tree.left) + countUnivalSubtrees(tree.right)
  );
}
