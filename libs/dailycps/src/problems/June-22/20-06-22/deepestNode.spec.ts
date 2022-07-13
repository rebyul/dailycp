import { BinaryNode } from '../../lib/BinaryNode';
import { deepestNode } from './deepestNode';

describe('Depeest node', () => {
  test.each([
    [new BinaryNode(1), 1],
    [new BinaryNode(1, new BinaryNode(2)), 2],
    [
      new BinaryNode(
        1,
        new BinaryNode(1),
        new BinaryNode(2, new BinaryNode(5), new BinaryNode(7))
      ),
      5,
    ],
  ])('.deepestNode(%p) returns %d', (tree, output) => {
    expect(deepestNode(tree)).toEqual(output);
  });
});
