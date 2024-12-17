/** This question was asked by ContextLogic.

Implement division of two positive integers without using the division,
multiplication, or modulus operators. Return the quotient as an integer,
ignoring the remainder.
*/

export function divide(denominator: number, nominator: number): number {
  let quotient = 0;
  let remainder = denominator;

  while (remainder - nominator >= 0) {
    remainder -= nominator;
    quotient++;
  }

  return quotient;
}
