/**
This problem was asked by Netflix.

A Cartesian tree with sequence S is a binary tree defined by the following two properties:

It is heap-ordered, so that each parent value is strictly less than that of its children.
An in-order traversal of the tree produces nodes with values that correspond exactly to S.
For example, given the sequence [3, 2, 6, 1, 9], the resulting Cartesian tree would be:

      1
    /   \
  2       9
 / \
3   6
Given a sequence S, construct the corresponding Cartesian tree.
*/

import { BinaryNode } from '@dailycp/lib';
import assert = require('node:assert');

export function cartesianTree(seq: number[]): BinaryNode | null {
  const rootValue = seq[0];
  if (rootValue === undefined) {
    return null;
  }

  let root = new BinaryNode(rootValue);

  for (let i = 1; i < seq.length; i++) {
    const element = seq[i];
    root = insertNode(root, new BinaryNode(element));
  }

  return root;
}

function insertNode(root: BinaryNode, node: BinaryNode) {
  // If the root node is smaller than the new node
  if (root.value > node.value) {
    node.left = root;
    root = node;
    return root;
  }

  // Get root's children to begin
  const searchPath = [root];

  while (searchPath.length > 0) {
    // This shift is a performance killer.
    // Every time you shift, the array needs to be shuffled, which multiplies
    // O(n) time complexity to the execution
    const currentNode = searchPath.shift();
    assert(currentNode !== undefined);

    // Empty slot
    if (currentNode.left === undefined) {
      currentNode.left = node;
      return root;
    }

    if (currentNode.right === undefined) {
      currentNode.right = node;
      return root;
    }

    // Left is larger, add left's children and continue to parent's right
    if (currentNode.left.value > node.value) {
      searchPath.push(currentNode.left);
    }

    if (currentNode.right.value > node.value) {
      searchPath.push(currentNode.right);
    }
  }
  throw Error('no empty slots wtf');
}
