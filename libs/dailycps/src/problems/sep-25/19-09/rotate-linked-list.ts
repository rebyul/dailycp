/**
 * This problem was asked by Airbnb.

Given a linked list and a positive integer k, rotate the list to the right by k places.

For example, given the linked list 7 -> 7 -> 3 -> 5 and k = 2, it should become 3 -> 5 -> 7 -> 7.

Given the linked list 1 -> 2 -> 3 -> 4 -> 5 and k = 3, it should become 3 -> 4 -> 5 -> 1 -> 2.

*/

import { LinkedList, LinkedListNode } from '@dailycp/lib';

export function rotateLinkedList(ll: LinkedList, k: number): LinkedList {
  if (k === 0) {
    return ll;
  }

  const effectiveK = k % ll.length;

  let tail = ll.head,
    newTail = ll.head;
  const currHead = ll.head;

  // Find cut point
  for (let i = 0; i < ll.length - 1; i++) {
    if (i < ll.length - effectiveK - 1) {
      newTail = newTail?.next || null;
    }
    tail = tail?.next || null;
  }

  // set new ll head
  ll.head = newTail?.next || null;

  // Cut newTail's next
  newTail!.next = null;

  // make tail point to currHead
  tail!.next = currHead;

  return ll;
}
