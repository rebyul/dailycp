/**
 * This problem was asked by Google.

Given the head of a singly linked list, swap every two nodes and return its head.

For example, given 1 -> 2 -> 3 -> 4, return 2 -> 1 -> 4 -> 3.
  */

import { LinkedList, LinkedListNode } from '@dailycp/lib';

export function swappedLinkedList(ll: LinkedList): LinkedList {
  if (ll.head === null || ll.head.next === null) {
    return ll;
  }

  // Dummy head for head update
  const dummy: LinkedListNode | null = new LinkedListNode(0);
  dummy.next = ll.head;
  let prev: LinkedListNode | null = dummy;
  let current: LinkedListNode | null = prev.next;

  while (current && current.next) {
    const first = current;
    const second = current.next;

    prev.next = second;
    first.next = second.next;
    second.next = first;

    prev = first;
    current = first.next;
  }

  ll.head = dummy.next;

  return ll;
}
