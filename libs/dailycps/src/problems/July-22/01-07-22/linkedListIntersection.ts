/**
 * This problem was asked by Google.

Given two singly linked lists that intersect at some point, find the intersecting node. The lists are non-cyclical.

For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 -> 10, return the node with value 8.

In this example, assume nodes with the same value are the exact same node objects.

Do this in O(M + N) time (where M and N are the lengths of the lists) and constant space.
 */

import { LinkedListNode } from '../../../lib/LinkedListNode';

export function findIntersection(listA: LinkedListNode, listB: LinkedListNode) {
  const visitedCache: Record<number, number | null> = {};

  let listAIterable: LinkedListNode | null = listA;

  // O(M) time complexity
  while (listAIterable) {
    visitedCache[listAIterable.val] = listAIterable.next?.val || null;
    listAIterable = listAIterable.next;
  }

  let listBIterable: LinkedListNode | null = listB;

  // O(N) time complexity
  while (listBIterable) {
    if (visitedCache[listBIterable.val] === listBIterable.next?.val)
      return listBIterable;
    listBIterable = listBIterable.next;
  }

  return null;
}
