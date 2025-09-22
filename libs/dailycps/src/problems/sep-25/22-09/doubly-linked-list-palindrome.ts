/**
 * Determine whether a doubly linked list is a palindrome. What if it’s singly linked?

For example, 1 -> 4 -> 3 -> 4 -> 1 returns True while 1 -> 4 returns False.
*/

import { DoublyLinkedList, LinkedList } from '../../../lib';

export function isDoublyListListPalindrome(
  ll: DoublyLinkedList | null
): boolean {
  if (ll === null || ll.length === 0) {
    return false;
  }
  let currHead = ll.head,
    currTail = ll?.tail;

  for (let i = 0; i < Math.floor(ll.length / 2); i++) {
    if (currHead?.val !== currTail?.val) {
      return false;
    }
    currHead = currHead?.next || null;
    currTail = currTail?.prev || null;
  }
  return true;
}

// 1-4-3-4-1 len 5 half i = 1 lim = 2  popstart = 3
// 1-4-4-1 len 4 half i = 1 lim = 2 popstart = 2
export function isSinglyLinkedListPalindrome(ll: LinkedList | null): boolean {
  if (ll == null || ll.length === 0) {
    return false;
  }

  const visitedStack = [],
    isEven = ll.length % 2 === 0;
  let curr = ll.head;
  const addLimit = Math.floor(ll.length / 2);
  const popStart = addLimit + (isEven ? 0 : 1);
  for (let i = 0; i < ll.length; i++) {
    if (curr === null) {
      throw Error('castastrophic failure: null curr');
    }
    // Traversing to half way
    if (i < addLimit) {
      visitedStack.push(curr.val);
    } else if (i >= popStart) {
      const popped = visitedStack.pop();
      if (popped === undefined) {
        throw Error('catastrohpic failure: visited stack is empty');
      }
      if (popped !== curr.val) {
        return false;
      }
    }

    curr = curr.next || null;
  }
  return true;
}
