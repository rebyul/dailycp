/*
 * This problem was asked by Microsoft.

You are given an string representing the initial conditions of some dominoes. Each element can take one of three values:

L, meaning the domino has just been pushed to the left,
R, meaning the domino has just been pushed to the right, or
., meaning the domino is standing still.
Determine the orientation of each tile when the dominoes stop falling. Note that if a domino receives a force from the left and right side simultaneously, it will remain upright.

For example, given the string .L.R....L, you should return LL.RRRLLL.

Given the string ..R...L.L, you should return ..RR.LLLL.
*/

export function fallingDominos(input: string): string {
  const result = input.split('');
  const rForces = Array(input.length).fill(0);
  let rFound = false;
  let rForce = 0;

  // go from left to right, cascading all R blocks
  for (let r = 0; r < input.length; r++) {
    switch (input[r]) {
      case 'R':
        {
          if (!rFound) {
            rFound = true;
            rForce = -1;
          }
        }
        break;
      case 'L': {
        rFound = false;
        rForce = 0;
        break;
      }
      case '.': {
        if (rFound) {
          result[r] = 'R';
          rForces[r] = rForce;
          rForce--;
        }
        break;
      }
      default:
        throw Error('invalid domino');
    }
  }

  let lFound = false;
  let lForce = 0;
  // go from right to left cascading all L blocks
  for (let l = input.length - 1; l >= 0; l--) {
    switch (result[l]) {
      case 'L':
        {
          if (!lFound) {
            lFound = true;
          }
          lForce = -1;
        }
        break;
      case 'R':
        {
          if (lFound) {
            if (lForce > rForces[l]) {
              result[l] = 'L';
              lForce--;
              // Early break as we continue
              break;
            }
            // 'R..L'
            // 'R R R L'
            // 0 -1 -2 x
            // 'R R L L'
            //      -1 0
            //
            // 'R . . . L'
            // 'R R R R L'
            // 0 -1 -2 -3 0
            // 0 -1 -2 L L
            // 0 -1 -2 -1 0
            // handle same force on domino case
            // there is no else here as if they meet at the same time, dont do anything
            if (lForce === rForces[l]) {
              result[l] = '.';
            }

            // forces are equal, ('.' or 'RL'). reset left strafe
            lForce = 0;
            lFound = false;
          }
        }
        break;
      case '.':
        {
          if (lFound) {
            result[l] = 'L';
            lForce--;
          }
        }
        break;
      default:
        throw Error('invalid domino');
    }
  }

  return result.join('');
}
