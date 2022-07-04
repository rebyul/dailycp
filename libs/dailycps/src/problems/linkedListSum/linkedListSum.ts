/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import { LinkedListNode } from '../../lib/LinkedListNode';

export function addTwoNumbers(
  l1: LinkedListNode | null,
  l2: LinkedListNode | null
): LinkedListNode | null {
  let sum = 0;
  let current = new LinkedListNode(0);
  const result = current;

  while (l1 || l2) {
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }

    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }

    current.next = new LinkedListNode(sum % 10);
    current = current.next;

    sum = sum > 9 ? 1 : 0;
  }

  if (sum) {
    current.next = new LinkedListNode(sum);
  }

  return result.next;
}
