import { createDoublyLinkedList, createLinkedList } from '../../../lib';
import {
  isDoublyListListPalindrome,
  isSinglyLinkedListPalindrome,
} from '././doubly-linked-list-palindrome';

describe('is doubly linked list palindrome', () => {
  test.each([
    ['empty null list', null, false],
    ['single item list', createDoublyLinkedList([1]), true],
    [
      'odd length palindrome list',
      createDoublyLinkedList([1, 4, 3, 4, 1]),
      true,
    ],
    [
      'odd length non palindrome list',
      createDoublyLinkedList([1, 4, 3, 5, 1]),
      false,
    ],
    [
      'even length palindrome list',
      createDoublyLinkedList([1, 4, 3, 3, 4, 1]),
      true,
    ],
    [
      'even length non palindrome list',
      createDoublyLinkedList([1, 4, 3, 2, 4, 1]),
      false,
    ],
  ])('%s: given %p, returns %p', (_, input, want) => {
    const res = isDoublyListListPalindrome(input);
    expect(res).toEqual(want);
  });
});

describe('is singly linked list palindrome', () => {
  test.each([
    ['empty null list', null, false],
    ['single item list', createLinkedList([1]), true],
    ['odd length palindrome list', createLinkedList([1, 4, 3, 4, 1]), true],
    [
      'odd length non palindrome list',
      createLinkedList([1, 4, 3, 5, 1]),
      false,
    ],
    ['even length palindrome list', createLinkedList([1, 4, 3, 3, 4, 1]), true],
    [
      'even length non palindrome list',
      createLinkedList([1, 4, 3, 2, 5, 1]),
      false,
    ],
  ])('%s: given %p, returns %p', (_, input, want) => {
    const res = isSinglyLinkedListPalindrome(input);
    expect(res).toEqual(want);
  });
});
