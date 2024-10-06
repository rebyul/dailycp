/**
 * This problem was asked by Salesforce.

Write a program to merge two binary trees. Each node in the new tree should hold a value equal to the sum of the values of the corresponding nodes of the input trees.

If only one input tree has a node in a given position, the corresponding node in the new tree should match that input node.

*/
import { GenericTree, mergeTree } from './binaryTreeMerge';

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

  it('should throw an error if an unsupported tree type is given', () => {
    const tree1 = new GenericTree<string>('abc', undefined, undefined);
    const tree2 = new GenericTree<string>('cbd', undefined, undefined);
    expect(() => mergeTree(tree1, tree2)).toThrow(
      Error('No merger available for given type')
    );
  });

  it('example from geekhack', () => {
    const root1 = new GenericTree<number>(1);
    root1.left = new GenericTree<number>(2);
    root1.right = new GenericTree<number>(3);
    root1.left.left = new GenericTree<number>(4);
    root1.left.right = new GenericTree<number>(5);
    root1.right.right = new GenericTree<number>(6);

    const root2 = new GenericTree<number>(4);
    root2.left = new GenericTree<number>(1);
    root2.right = new GenericTree<number>(7);
    root2.left.left = new GenericTree<number>(3);
    root2.right.left = new GenericTree<number>(2);
    root2.right.right = new GenericTree<number>(6);

    const result = mergeTree(root1, root2);
    expect(result?.value).toEqual(5);
    expect(result?.left?.value).toEqual(3);
    expect(result?.right?.value).toEqual(10);
    expect(result?.left?.left?.value).toEqual(7);
    expect(result?.left?.right?.value).toEqual(5);
    expect(result?.right?.left?.value).toEqual(2);
    expect(result?.right?.right?.value).toEqual(12);
  });
});
