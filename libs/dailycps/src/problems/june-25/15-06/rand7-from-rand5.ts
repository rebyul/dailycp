/**
 * This problem was asked by Two Sigma.

Using a function rand5() that returns an integer from 1 to 5 (inclusive) with
uniform probability, implement a function rand7() that returns an integer from
1 to 7 (inclusive).
*/
export function rand7(): number {
  let res = 0;
  do {
    res = (rand5() - 1) * 5 + (rand5() - 1);
  } while (res >= 21);
  return (res % 7) + 1;
}

// Return a number between 1 and 5 inclusive
export function rand5(): number {
  return Math.ceil(Math.random() * 5);
}
