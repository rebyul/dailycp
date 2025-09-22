import { createLinkedList, LinkedList } from './LinkedList';
import { LinkedListNode } from './LinkedListNode';

describe('Linked List', () => {
  test('Create empty linked list', () => {
    const emptyList = new LinkedList();
    expect(emptyList.length).toEqual(0);
  });

  test('List with 3 items returns length 3', () => {
    const length3List = new LinkedList(
      new LinkedListNode(0, new LinkedListNode(1, new LinkedListNode(2)))
    );

    expect(length3List.length).toEqual(3);
    expect(length3List.head).not.toBeNull();
    expect(length3List.head?.val).toEqual(0);
  });

  test('createLinkedList parses correctly', () => {
    const input = [1, 2, 3, 4, 5];
    const result = createLinkedList(input);

    expect(result.length).toEqual(input.length);

    let curr = result.head;
    for (const v of input) {
      expect(curr!.val).toEqual(v);
      curr = curr?.next || null;
    }
  });
});
