import { LinkedList } from './LinkedList';
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
});
