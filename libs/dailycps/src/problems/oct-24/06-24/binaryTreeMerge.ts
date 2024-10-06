/**
 * This problem was asked by Salesforce.

Write a program to merge two binary trees. Each node in the new tree should hold a value equal to the sum of the values of the corresponding nodes of the input trees.

If only one input tree has a node in a given position, the corresponding node in the new tree should match that input node.

*/

export class NumberTree {
  constructor(
    public value?: number,
    public left?: NumberTree,
    public right?: NumberTree
  ) {}
}
export function mergeTree(
  tree1?: NumberTree,
  tree2?: NumberTree
): NumberTree | undefined {
  if (!tree1) {
    return tree2;
  }
  if (!tree2) {
    return tree1;
  }

  const result = new NumberTree(0);

  result.value = mergeValues(tree1?.value, tree2?.value);
  result.left = mergeTree(tree1?.left, tree2?.left);
  result.right = mergeTree(tree1?.right, tree2?.right);

  return result;
}

function mergeValues(left?: number, right?: number) {
  if (!left || Number.isNaN(left)) {
    return right;
  }
  if (!right || Number.isNaN(right)) {
    return left;
  }
  return left + right;
}
