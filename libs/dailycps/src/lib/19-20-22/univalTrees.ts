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

export class Node {
  constructor(public value: number, public left?: Node, public right?: Node) {}
}

export function countUnivalSubtrees(tree: Node) {
  let count = 0;

  if (tree.left) {
    count += countUnivalSubtrees(tree.left);
  }
  if (tree.right) {
    count += countUnivalSubtrees(tree.right);
  }

  // DFS
  if (
    (!tree.left && !tree.right) ||
    (tree.left?.value === tree.value && tree.right?.value === tree.value)
  ) {
    count++;
  }
  return count;
}
