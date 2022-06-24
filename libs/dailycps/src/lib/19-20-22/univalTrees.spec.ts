import { Node, countUnivalSubtrees } from './univalTrees';

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
      new Node(
        0,
        new Node(1),
        new Node(0, new Node(1, new Node(1), new Node(1)), new Node(0))
      ),
      5,
    ],
  ])('.countUnivalSubtrees(%p) returns %d', (tree, count) => {
    expect(countUnivalSubtrees(tree)).toEqual(count);
  });
});
