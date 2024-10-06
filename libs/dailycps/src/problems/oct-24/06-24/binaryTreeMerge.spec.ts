/**
 * This problem was asked by Salesforce.

Write a program to merge two binary trees. Each node in the new tree should hold a value equal to the sum of the values of the corresponding nodes of the input trees.

If only one input tree has a node in a given position, the corresponding node in the new tree should match that input node.

*/
import { mergeTree, NumberTree } from './binaryTreeMerge';

describe('merge two binary trees', () => {
  it('should merge correctly', () => {
    const tree1 = new NumberTree(1, new NumberTree(2), new NumberTree(3));
    const tree2 = new NumberTree(4, new NumberTree(5), new NumberTree(6));

    const result = mergeTree(tree1, tree2);
    expect(result?.value).toEqual(5);
    expect(result?.left?.value).toEqual(7);
    expect(result?.right?.value).toEqual(9);
  });

  it('should return first tree if second tree is empty', () => {
    const tree1 = new NumberTree(1, new NumberTree(2), new NumberTree(3));

    const result = mergeTree(tree1, undefined);
    expect(result?.value).toEqual(tree1.value);
    expect(result?.left?.value).toEqual(tree1?.left?.value);
    expect(result?.right?.value).toEqual(tree1?.right?.value);
  });
  it('should return second tree if first tree is empty', () => {
    const tree2 = new NumberTree(1, new NumberTree(2), new NumberTree(3));

    const result = mergeTree(undefined, tree2);
    expect(result?.value).toEqual(tree2.value);
    expect(result?.left?.value).toEqual(tree2?.left?.value);
    expect(result?.right?.value).toEqual(tree2?.right?.value);
  });
});
