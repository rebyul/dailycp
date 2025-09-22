import {
  createDoublyLinkedList,
  DoublyLinkedList,
  DoublyLinkedListNode,
} from './DoublyLinkedList';

describe('Doubly Linked List', () => {
  test('constructor', () => {
    const list = new DoublyLinkedList();
    expect(list.length).toEqual(0);
  });

  test('constructor with value', () => {
    const first = new DoublyLinkedListNode(1);
    const second = new DoublyLinkedListNode(2);
    const third = new DoublyLinkedListNode(3);

    third.prev = second;
    second.prev = first;
    second.next = third;
    first.next = second;
    const list = new DoublyLinkedList(first);

    expect(list.length).toEqual(3);
  });

  test('create doubly linked list', () => {
    const input = [1, 2, 3];
    const result = createDoublyLinkedList(input);

    expect(result.head).not.toBeNull();
    expect(result.head?.val).toEqual(1);
    expect(result.head?.next).not.toBeNull();
    expect(result.head?.next?.val).toEqual(2);
    expect(result.head?.next?.prev?.val).toEqual(1);
    expect(result.head?.next?.next).not.toBeNull();
    expect(result.head?.next?.next?.val).toEqual(3);
    expect(result.tail).not.toBeNull();
    expect(result.tail?.val).toEqual(3);
    expect(result.tail?.next).toBeNull();
  });

  test('remove head node', () => {
    const ll = createDoublyLinkedList([1, 2, 3]);
    ll.remove(1);
    expect(ll.head?.val).toEqual(2);
    expect(ll.head?.next?.val).toEqual(3);
    expect(ll.tail?.val).toEqual(3);
    expect(ll.tail?.prev?.val).toEqual(2);
  });

  test('remove middle node', () => {
    const ll = createDoublyLinkedList([1, 2, 3]);
    ll.remove(2);
    expect(ll.head?.val).toEqual(1);
    expect(ll.head?.next?.val).toEqual(3);
    expect(ll.tail?.val).toEqual(3);
    expect(ll.tail?.prev?.val).toEqual(1);
  });

  test('remove tail node', () => {
    const ll = createDoublyLinkedList([1, 2, 3]);
    ll.remove(3);
    expect(ll.head?.val).toEqual(1);
    expect(ll.head?.next?.val).toEqual(2);
    expect(ll.tail?.val).toEqual(2);
    expect(ll.tail?.prev?.val).toEqual(1);
  });
});
