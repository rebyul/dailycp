/**
 * This problem was asked by Salesforce.

Write a program to merge two binary trees. Each node in the new tree should hold a value equal to the sum of the values of the corresponding nodes of the input trees.

If only one input tree has a node in a given position, the corresponding node in the new tree should match that input node.

*/

export class GenericTree<T> {
  constructor(
    public value: T,
    public left?: GenericTree<T>,
    public right?: GenericTree<T>
  ) { }
}
export function mergeTree<T>(
  tree1?: GenericTree<T>,
  tree2?: GenericTree<T>
): GenericTree<T> | undefined {
  if (!tree1) {
    return tree2;
  }
  if (!tree2) {
    return tree1;
  }

  const result = new GenericTree<T>(genericMergeValues<T>(tree1.value, tree2.value), mergeTree(tree1.left, tree2.left), mergeTree(tree1.right, tree2.right));

  return result;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isNumber(x: any): x is number {
  return typeof x === 'number';
}

function mergeNumbers<T = number>(left?: T, right?: T): T {
  if (!isNumber(left)) {
    if (right === undefined) throw new Error('merging both null');
    return right;
  }
  if (!isNumber(right)) {
    return left;
  }
  return (left + right) as T;
}

function genericMergeValues<T = number>(left: T, right: T): T {
  if (isNumber(left) && isNumber(right)) {
    return mergeNumbers(left, right);
  }

  throw new Error('No merger available');
}
