import { type BinaryNode } from '../../../lib/BinaryNode';
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

export function countUnivalSubtrees(tree?: BinaryNode): number {
  if (!tree) {
    return 0;
  }

  let count = 0;

  count += countUnivalSubtrees(tree.left) + countUnivalSubtrees(tree.right);

  return count + (isUnivalTree(tree, tree.value) ? 1 : 0);
}

function isUnivalTree(
  node: BinaryNode | undefined,
  value: BinaryNode['value']
): boolean {
  if (!node) return true;

  if (node.value === value)
    return isUnivalTree(node.left, value) && isUnivalTree(node.right, value);
  return false;
}
