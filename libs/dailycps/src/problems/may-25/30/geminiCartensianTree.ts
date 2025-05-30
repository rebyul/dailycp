import { BinaryNode } from '@dailycp/lib';

/**
 * Constructs a Cartesian tree from a given sequence of numbers.
 * A Cartesian tree is a binary tree that satisfies two properties:
 * 1. It is heap-ordered (each parent value is strictly less than that of its children).
 * 2. An in-order traversal of the tree produces nodes with values that correspond exactly to the input sequence.
 *
 * @param seq The input sequence of numbers.
 * @returns The root of the Cartesian tree, or null if the sequence is empty.
 *
 * Time Complexity: O(N), where N is the length of the sequence. Each element is pushed and popped from the stack at most once.
 * Space Complexity: O(N), in the worst case (e.g., a strictly increasing sequence), where the stack might hold all nodes.
 */
export function cartesianTree(seq: number[]): BinaryNode | null {
  if (!seq || seq.length === 0) {
    return null;
  }

  // The stack will store nodes that are potential right parents.
  // It maintains a decreasing order of values.
  const stack: BinaryNode[] = [];

  for (const element of seq) {
    const newNode = new BinaryNode(element);

    // While the stack is not empty and the top of the stack has a value
    // greater than the current new node's value:
    // This means the stack top cannot be the right parent,
    // and the new node will become the right child of the element below it.
    while (stack.length > 0 && stack[stack.length - 1].value > newNode.value) {
      newNode.left = stack.pop()!; // The popped node becomes the left child of newNode
      // (maintaining in-order: popped node was to the left of newNode)
    }

    // If the stack is not empty, it means the top of the stack is smaller than newNode.
    // This smaller node will become the right child of the element on the stack top.
    if (stack.length > 0) {
      stack[stack.length - 1].right = newNode;
    }

    // Push the new node onto the stack. It's now a potential right parent
    // for subsequent elements.
    stack.push(newNode);
  }

  // The root of the Cartesian tree is the last remaining element on the stack.
  // If the stack is empty, it means the sequence was empty, which is handled at the beginning.
  return stack.length > 0 ? stack[0] : null; // In the end, only the root remains on the stack
}

// Example usage and verification (requires a simple in-order traversal helper)
// Define BinaryNode if not imported
// class BinaryNode {
//   value: number;
//   left: BinaryNode | null;
//   right: BinaryNode | null;
//   constructor(value: number) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }

// Helper to perform in-order traversal for verification
function inOrderTraversal(
  node: BinaryNode | undefined,
  result: number[] = []
): number[] {
  if (node === undefined) {
    return result;
  }
  inOrderTraversal(node?.left, result);
  result.push(node.value);
  inOrderTraversal(node?.right, result);
  return result;
}

// Helper to check heap-order property
function isHeapOrdered(node: BinaryNode | undefined): boolean {
  if (node === undefined) {
    return true;
  }
  if (node.left !== undefined && node?.left.value <= node?.value) {
    return false;
  }
  if (node?.right !== undefined && node?.right.value <= node?.value) {
    return false;
  }
  return isHeapOrdered(node?.left) && isHeapOrdered(node?.right);
}
