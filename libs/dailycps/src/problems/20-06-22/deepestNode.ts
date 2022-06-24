import { BinaryNode } from '../../lib/BinaryNode';

// Given the root to a binary tree, return the deepest node.
// Clarification question: if there are nodes of equal depth, which do we return?
// ^ return the most left side node

export function deepestNode(tree: BinaryNode): number | null {
  return deepestNodeWithDepth(tree, 1)?.[0].value || 0;
}

function deepestNodeWithDepth(
  tree: BinaryNode | undefined,
  currentDepth = 0
): [BinaryNode, number] | null {
  if (!tree) return null;
  if (!(tree.left || tree.right)) {
    return [tree, currentDepth];
  }
  const deepestLeftTuple = deepestNodeWithDepth(tree.left, currentDepth + 1);
  const deepestRightTuple = deepestNodeWithDepth(tree.right, currentDepth + 1);

  return (deepestLeftTuple?.[1] || 0) >= (deepestRightTuple?.[1] || 0)
    ? deepestLeftTuple
    : deepestRightTuple;
}
