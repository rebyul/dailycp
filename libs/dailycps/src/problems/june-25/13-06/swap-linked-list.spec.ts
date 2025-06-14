import { LinkedList, LinkedListNode } from '@dailycp/lib';
import { swappedLinkedList } from './swap-linked-list';

describe('Swap linked list', () => {
  test('Empty list', () => {
    const emptyList = new LinkedList();
    const result = swappedLinkedList(emptyList);
    expect(result).not.toBeNull();
    expect(result.head).toBeNull();
  });

  test('Single item list', () => {
    const singleList = new LinkedList(new LinkedListNode(0));
    const result = swappedLinkedList(singleList);
    expect(result).not.toBeNull();
    expect(result.head).not.toBeNull();
    expect(result.head?.val).toEqual(0);
  });

  test('Length 2 list swaps nodes', () => {
    const length2list = new LinkedList(
      new LinkedListNode(0, new LinkedListNode(1))
    );
    const result = swappedLinkedList(length2list);
    expect(result).not.toBeNull();
    expect(result.length).toEqual(2);
    expect(result.head).not.toBeNull();
    expect(result.head?.val).toEqual(1);
    expect(result.head?.next).not.toBeNull();
    expect(result.head?.next?.val).toEqual(0);
  });

  test('Length 3 list swaps nodes', () => {
    const length2list = new LinkedList(
      new LinkedListNode(0, new LinkedListNode(1, new LinkedListNode(2)))
    );
    const result = swappedLinkedList(length2list);
    expect(result).not.toBeNull();
    expect(result.length).toEqual(3);
    expect(result.head).not.toBeNull();
    expect(result.head?.val).toEqual(1);
    expect(result.head?.next).not.toBeNull();
    expect(result.head?.next?.val).toEqual(0);
    expect(result.head?.next?.next).not.toBeNull();
    expect(result.head?.next?.next?.val).toEqual(2);
  });

  test('Length 4 list swaps nodes', () => {
    const length2list = new LinkedList(
      new LinkedListNode(
        0,
        new LinkedListNode(1, new LinkedListNode(2, new LinkedListNode(3)))
      )
    );
    const result = swappedLinkedList(length2list);
    expect(result).not.toBeNull();
    expect(result.length).toEqual(4);
    expect(result.head).not.toBeNull();
    expect(result.head?.val).toEqual(1);
    expect(result.head?.next).not.toBeNull();
    expect(result.head?.next?.val).toEqual(0);
    expect(result.head?.next?.next).not.toBeNull();
    expect(result.head?.next?.next?.val).toEqual(3);
    expect(result.head?.next?.next?.next).not.toBeNull();
    expect(result.head?.next?.next?.next?.val).toEqual(2);
  });
});
