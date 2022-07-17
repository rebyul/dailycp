import { BinaryNode } from '../../../lib/BinaryNode';
import { countNodes } from './countNodes';

describe('Count Nodes', () => {
  test.each([
    [new BinaryNode(1), 1],
    [new BinaryNode(1, new BinaryNode(2)), 2],
    [
      new BinaryNode(
        1,
        new BinaryNode(1),
        new BinaryNode(2, new BinaryNode(5), new BinaryNode(1))
      ),
      5,
    ],
  ])('.countNodes(%p) return %d', (tree, output) => {
    expect(countNodes(tree)).toEqual(output);
  });
});
