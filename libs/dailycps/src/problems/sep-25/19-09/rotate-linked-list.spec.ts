import { createLinkedList, LinkedList, LinkedListNode } from '@dailycp/lib';
import { rotateLinkedList } from './rotate-linked-list';

describe('rotate linked lists', () => {
  test('empty linked list', () => {
    const input = new LinkedList();
    const k = 0,
      want = new LinkedList();
    const result = rotateLinkedList(input, k);
    expect(result.length).toEqual(want.length);

    let a = result.head,
      b = want.head;

    while (a !== null) {
      expect(a.val).toEqual(b?.val);
      a = a.next;
      b = b?.next || null;
    }
  });

  test.each([
    [
      new LinkedList(
        new LinkedListNode(
          7,
          new LinkedListNode(7, new LinkedListNode(3, new LinkedListNode(5)))
        )
      ),
      0,
      new LinkedList(
        new LinkedListNode(
          7,
          new LinkedListNode(7, new LinkedListNode(3, new LinkedListNode(5)))
        )
      ),
    ],
    [
      new LinkedList(
        new LinkedListNode(
          7,
          new LinkedListNode(7, new LinkedListNode(3, new LinkedListNode(5)))
        )
      ),
      2,
      new LinkedList(
        new LinkedListNode(
          3,
          new LinkedListNode(5, new LinkedListNode(7, new LinkedListNode(7)))
        )
      ),
    ],
    [
      new LinkedList(
        new LinkedListNode(
          1,
          new LinkedListNode(
            2,
            new LinkedListNode(3, new LinkedListNode(4, new LinkedListNode(5)))
          )
        )
      ),
      3,
      new LinkedList(
        new LinkedListNode(
          3,
          new LinkedListNode(
            4,
            new LinkedListNode(5, new LinkedListNode(1, new LinkedListNode(2)))
          )
        )
      ),
    ],
    [
      new LinkedList(
        new LinkedListNode(
          1,
          new LinkedListNode(
            2,
            new LinkedListNode(3, new LinkedListNode(4, new LinkedListNode(5)))
          )
        )
      ),
      1,
      new LinkedList(
        new LinkedListNode(
          5,
          new LinkedListNode(
            1,
            new LinkedListNode(2, new LinkedListNode(3, new LinkedListNode(4)))
          )
        )
      ),
    ],
    [createLinkedList([1, 2, 3, 4, 5]), 2, createLinkedList([4, 5, 1, 2, 3])],
  ])('given %j, rotate linked lists and k=%d, returns %j', (input, k, want) => {
    const result = rotateLinkedList(input, k);
    expect(result.length).toEqual(want.length);

    let a = result.head,
      b = want.head;

    while (a !== null) {
      expect(a.val).toEqual(b?.val);
      a = a.next;
      b = b?.next || null;
    }
  });
});
