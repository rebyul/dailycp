import { BinaryNode } from '../../lib/BinaryNode';
import { countUnivalSubtrees } from './univalTrees';

/**
 *
 * 0
  / \
 1   0
    / \
   1   0
  / \
 1   1
 */

describe('Unival trees', () => {
  test.each([
    [
      new BinaryNode(
        0,
        new BinaryNode(1),
        new BinaryNode(
          0,
          new BinaryNode(1, new BinaryNode(1), new BinaryNode(1)),
          new BinaryNode(0)
        )
      ),
      5,
    ],
  ])('.countUnivalSubtrees(%p) returns %d', (tree, count) => {
    expect(countUnivalSubtrees(tree)).toEqual(count);
  });
});
