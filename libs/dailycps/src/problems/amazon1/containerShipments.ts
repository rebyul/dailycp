/**
 * Given an array of container weights and number of days the containers must be shipped in
 * find the minimum size of the truck that can carry the weights in the given number of days
 * e.g. Given the weights [1,2,3,4,7,9,11,14,15] and 5 days, it should return 15
 */

import { max, sum } from 'lodash';

export function findTruckSize(weights: number[], days: number): number {
  if (weights.length === 0) {
    return 0;
  }

  let minTruckSize = max(weights),
    maxTruckSize = sum(weights) + 1;

  if (!minTruckSize || minTruckSize < 0) {
    return 0;
  }

  if (minTruckSize === maxTruckSize) {
    return minTruckSize;
  }

  // Binary search for min truck size
  let truckSize = minTruckSize,
    currentMinTruckSize = null;

  for (
    ;
    minTruckSize !== maxTruckSize;
    truckSize = Math.floor((minTruckSize + maxTruckSize) / 2)
  ) {
    const daysToShip = findDaysToShip(weights, truckSize);

    // if it can't ship, increase minimum truck size by 1 so trucksize takes the next binary chunk
    if (!daysToShip || daysToShip > days) {
      minTruckSize = truckSize + 1;
      continue;
    } else {
      // If it can ship
      if (daysToShip <= days) {
        // If the current min
        if (currentMinTruckSize === null) {
          currentMinTruckSize = truckSize;
        }
        if (truckSize <= currentMinTruckSize) {
          currentMinTruckSize = truckSize;
          maxTruckSize = truckSize;
        }
      }
    }
  }
  return currentMinTruckSize || 0;
}

export function findDaysToShip(weights: number[], truckSize: number): number {
  let days = 0;
  const remainingWeights = [...weights];

  while (remainingWeights.length > 0) {
    const load = findOptimalLoad(remainingWeights, truckSize);
    if (!load) {
      return 0;
    }
    load.forEach((l) => {
      remainingWeights.splice(remainingWeights.indexOf(l), 1);
    });
    days++;
  }

  return days;
}

export function findOptimalLoad(
  weights: number[],
  truckSize: number
): number[] | null {
  if (weights.length === 0) {
    return [];
  }

  if (truckSize < 0) {
    return null;
  }

  let currentMaxLoad: number[] | null = null;

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    if (weight > truckSize) {
      continue;
    }
    const currentLoad = [weight];

    const remainingWeights = [...weights];
    remainingWeights.splice(i, 1);
    const nextLoad = findOptimalLoad(remainingWeights, truckSize - weight);
    if (nextLoad !== null) {
      currentLoad.push(...nextLoad);
    }
    if (sum(currentLoad) > sum(currentMaxLoad)) {
      currentMaxLoad = currentLoad;
    }
  }
  return currentMaxLoad;
}
