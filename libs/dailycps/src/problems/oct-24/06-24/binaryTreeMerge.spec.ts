/**
 * This problem was asked by Salesforce.

Write a program to merge two binary trees. Each node in the new tree should hold a value equal to the sum of the values of the corresponding nodes of the input trees.

If only one input tree has a node in a given position, the corresponding node in the new tree should match that input node.

*/
import { mergeTree, GenericTree } from './binaryTreeMerge';

describe('merge two binary trees', () => {
  it('should merge correctly', () => {
    const tree1 = new GenericTree<number>(
      1,
      new GenericTree<number>(2),
      new GenericTree<number>(3)
    );
    const tree2 = new GenericTree<number>(
      4,
      new GenericTree<number>(5),
      new GenericTree<number>(6)
    );

    const result = mergeTree(tree1, tree2);
    expect(result?.value).toEqual(5);
    expect(result?.left?.value).toEqual(7);
    expect(result?.right?.value).toEqual(9);
  });

  it('should return first tree if second tree is empty', () => {
    const tree1 = new GenericTree<number>(
      1,
      new GenericTree<number>(2),
      new GenericTree<number>(3)
    );

    const result = mergeTree(tree1, undefined);
    expect(result?.value).toEqual(tree1.value);
    expect(result?.left?.value).toEqual(tree1?.left?.value);
    expect(result?.right?.value).toEqual(tree1?.right?.value);
  });
  it('should return second tree if first tree is empty', () => {
    const tree2 = new GenericTree<number>(
      1,
      new GenericTree<number>(2),
      new GenericTree<number>(3)
    );

    const result = mergeTree(undefined, tree2);
    expect(result?.value).toEqual(tree2.value);
    expect(result?.left?.value).toEqual(tree2?.left?.value);
    expect(result?.right?.value).toEqual(tree2?.right?.value);
  });
});
