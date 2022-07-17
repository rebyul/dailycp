import { BinaryNode } from '../../../lib/BinaryNode';
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
    [
      new BinaryNode(
        3,
        new BinaryNode(2),
        new BinaryNode(
          3,
          undefined,
          new BinaryNode(2, new BinaryNode(2), new BinaryNode(2))
        )
      ),
      4,
    ],
    /**
     *              1
     *          1       1
     *        1   1   2   2
     *       1 1 1 1 2 2 2 2
     */
    [
      new BinaryNode(
        1,
        new BinaryNode(
          1,
          new BinaryNode(1, new BinaryNode(1), new BinaryNode(1)),
          new BinaryNode(1, new BinaryNode(1), new BinaryNode(1))
        ),
        new BinaryNode(
          1,
          new BinaryNode(2, new BinaryNode(2), new BinaryNode(2)),
          new BinaryNode(2, new BinaryNode(2), new BinaryNode(2))
        )
      ),
      13,
    ],
  ])('.countUnivalSubtrees(%p) returns %d', (tree, count) => {
    expect(countUnivalSubtrees(tree)).toEqual(count);
  });
});
