import { BinaryNode } from '../../lib/BinaryNode';

// Given the root to a binary tree, count the total number of nodes there are.
export function countNodes(tree?: BinaryNode): number {
  if (!tree) return 0;

  const count = 1;

  return count + countNodes(tree.left) + countNodes(tree.right);
}
