import assert = require('node:assert');

/**
 * This problem was asked by Salesforce.
 *
 * The number 6174 is known as Kaprekar's contant, after the mathematician who discovered an associated property: for all four-digit numbers with at least two distinct digits, repeatedly applying a simple procedure eventually results in this value. The procedure is as follows:
 *
 * For a given input x, create two new numbers that consist of the digits in x in ascending and descending order.
 * Subtract the smaller number from the larger number.
 * For example, this algorithm terminates in three steps when starting from 1234:
 *
 * 4321 - 1234 = 3087
 * 8730 - 0378 = 8352
 * 8532 - 2358 = 6174
 * Write a function that returns how many steps this will take for a given input N.
 */
const kaprekarsConstant = 6174;

export function getKaprekarsConstant(input: number): number {
  assert(input > 999 && input < 10000);
  let depth = 1;
  const [asc, desc] = getPair(input);

  const diff = desc - asc;

  if (diff === kaprekarsConstant) {
    return depth;
  }

  return getKaprekarsConstant(diff) + 1;
}

export function getPair(input: number): [number, number] {
  const asc = [],
    desc = [],
    inputStr = Array.from(input.toString().padStart(4, '0')).sort((a, b) =>
      a < b ? -1 : 1
    );

  for (let i = 0; i < inputStr.length; i++) {
    asc.push(inputStr[i]);
    desc.push(inputStr[inputStr.length - 1 - i]);
  }

  return [Number.parseInt(asc.join('')), Number.parseInt(desc.join(''))];
}
