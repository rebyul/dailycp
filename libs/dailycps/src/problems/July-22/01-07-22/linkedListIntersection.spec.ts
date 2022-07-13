import { LinkedListNode } from '../../../lib/LinkedListNode';
import { findIntersection } from './linkedListIntersection';
describe('Find intersection node between two linked lists', () => {
  test.each([
    [
      new LinkedListNode(
        3,
        new LinkedListNode(7, new LinkedListNode(8, new LinkedListNode(10)))
      ),
      new LinkedListNode(
        99,
        new LinkedListNode(1, new LinkedListNode(8, new LinkedListNode(10)))
      ),
      new LinkedListNode(8, new LinkedListNode(10)),
    ],
  ])('.findIntersection(%p, %p) returns %p', (listA, listB, output) => {
    expect(findIntersection(listA, listB)).toEqual(output);
  });
});
