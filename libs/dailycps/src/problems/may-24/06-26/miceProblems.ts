/**
 * Good morning! Here's your coding interview problem for today.

This problem was asked by Amazon.

Consider the following scenario: there are N mice and N holes placed at integer points along a line. Given this, find a method that maps mice to holes such that the largest number of steps any mouse takes is minimized.

Each move consists of moving one mouse one unit to the left or right, and only one mouse can fit inside each hole.

For example, suppose the mice are positioned at [1, 4, 9, 15], and the holes are located at [10, -5, 0, 16]. In this case, the best pairing would require us to send the mouse at 1 to the hole at -5, so our function should return 6.
**/
export function findMinimumDistance(mice: number[], holes: number[]): number {
  // Generate distance grid for each mice to each hole
  // const distances = generateDistances(mice, holes);
  // console.log(distances);

  // Get the maximum distance for each seed mouse-hole combination
  let currentMax = Number.MAX_VALUE;
  // currentMax = getMaximum(distances, mice, holes, Number.MIN_VALUE);
  const cum = [];
  for (let i = 0; i < holes.length; i++) {
    // console.log('---------starting max', Math.abs(mice[0] - holes[i]));
    const result = getMaximum(
      mice.filter((m) => m !== mice[0]),
      holes.filter((h) => h !== holes[i]),
      Math.abs(mice[0] - holes[i])
    );
    cum.push(result);
    if (result < currentMax) {
      currentMax = result;
    }
  }
  // console.log(cum);
  return currentMax;
}

// Try to find overlapping distances between the mice and holes arrays
// Sort mice and holes
// Find distance between mice min and hole max and mice max vs hole min
// Take the lower of the two and that should be the min.
export function findMin(mice: number[], holes: number[]): number {
  const orderedMice = mice.sort((a, b) => (a < b ? -1 : 1));
  const orderedHoles = holes.sort((a, b) => (a < b ? -1 : 1));
  const firstMin = Math.max(
    Math.abs(orderedMice[0] - orderedHoles[0]), // Min to min
    Math.abs(
      orderedMice[orderedMice.length - 1] -
        orderedHoles[orderedHoles.length - 1]
    ) // max to max
  );
  // const secondMin = Math.max(
  //   Math.abs(orderedMice[orderedMice.length - 1] - orderedHoles[0]), // max to min
  //   Math.abs(orderedMice[0] - orderedHoles[orderedHoles.length - 1]) // min to max
  // );

  // console.log(orderedMice, orderedHoles, firstMin, secondMin);
  return firstMin;
  // return Math.min(firstMin, secondMin);
}

function generateDistances(mice: number[], holes: number[]): number[][] {
  const localMinima: number[][] = Array.from(Array(mice.length), () =>
    Array(holes.length).fill(-1)
  );

  // Send the first mouse to to the first hole.
  // Then find the maximum distance each mouse needs to go to each hole
  for (let mouseIndex = 0; mouseIndex < mice.length; mouseIndex++) {
    for (let holeIndex = 0; holeIndex < holes.length; holeIndex++) {
      localMinima[mouseIndex][holeIndex] = Math.abs(
        mice[mouseIndex] - holes[holeIndex]
      );
    }
  }

  return localMinima;
}

function getMaximum(
  // distances: number[][],
  rMicePositions: number[],
  rHolesPositions: number[],
  currentMaxDistance: number
): number {
  if (rMicePositions.length === 1) {
    // console.log(
    //   '------------------------- ending possibility min ',
    //   Math.abs(rMicePositions[0] - rHolesPositions[0]),
    //   'given current max',
    //   currentMaxDistance
    // );
    return Math.max(
      currentMaxDistance,
      Math.abs(rMicePositions[0] - rHolesPositions[0])
    );
  }

  let localmax = Number.MAX_VALUE;

  for (let mIndex = 0; mIndex < rMicePositions.length; mIndex++) {
    for (let hIndex = 0; hIndex < rHolesPositions.length; hIndex++) {
      // console.log(
      //   '------------------------- at mouse ',
      //   rMicePositions[mIndex],
      //   'hole',
      //   rHolesPositions[hIndex],
      //   'current distance',
      //   Math.abs(rMicePositions[mIndex] - rHolesPositions[hIndex])
      // );
      const nextMax = getMaximum(
        rMicePositions.filter((v) => v !== rMicePositions[mIndex]),
        rHolesPositions.filter((v) => v !== rHolesPositions[hIndex]),
        Math.abs(rMicePositions[mIndex] - rHolesPositions[hIndex])
      );
      // console.log(
      //   'Remaining mice',
      //   rMicePositions,
      //   'remaining holes',
      //   rHolesPositions,
      //   'current mouse',
      //   rMicePositions[mIndex],
      //   'currentTargetHole',
      //   rHolesPositions[hIndex],
      //   'my value',
      //   Math.abs(rMicePositions[mIndex] - rHolesPositions[hIndex])
      // );
      localmax = Math.min(
        localmax,
        // Math.abs(rMicePositions[mIndex] - rHolesPositions[hIndex]),
        nextMax
      );
      // console.log('-----------ending one route with ', localmax);
    }
  }

  return Math.max(currentMaxDistance, localmax);
}
