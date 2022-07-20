import {
  findDaysToShip,
  findOptimalLoad,
  findTruckSize,
} from './containerShipments';

describe('Amazon loop interview 1', () => {
  test.each([
    [[2, 3, 1], 3, [2, 1]],
    [[2, 1, 3], 3, [2, 1]],
    [[1, 2, 3, 4, 7, 9, 10, 11, 14, 15], 15, [1, 2, 3, 9]],
    [[4, 7, 10, 11, 14, 15], 15, [4, 11]],
    [[7, 10, 14, 15], 15, [15]],
    [[7, 10, 14], 15, [14]],
    [[7, 10], 15, [10]],
    [[7], 15, [7]],
    [[16], 15, null],
  ])('.findOptimalLoad(%p, %d) returns %p', (weights, truckSize, output) => {
    const result = findOptimalLoad(weights, truckSize);

    expect(result).toEqual(
      output === null ? output : expect.arrayContaining(output)
    );
  });

  test.each([
    [[1, 2, 3], 3, 2],
    [[1, 1, 1], 1, 3],
    [[1, 2, 3, 4, 5, 6], 15, 2],
    [[1, 2, 3, 4, 7, 9, 10, 11, 14, 15], 15, 6],
    [[1, 2, 3, 4, 7, 9, 10, 11, 14, 15], 76, 1],
  ])('.findDaysToShip(%p, %d) returns %d', (weights, truckSize, output) => {
    expect(findDaysToShip(weights, truckSize)).toEqual(output);
  });

  test.each([
    [[1, 2], 2, 2],
    [[1, 2, 3, 4, 7, 9, 10, 11, 14, 15], 6, 15],
    [[1, 2, 3, 4, 7, 9, 10, 11, 14, 15], 1, 76],
    [[1, 1, 1, 1], 4, 1],
  ])('.findTruckSize(%p, %d) returns %d', (weights, days, output) => {
    expect(findTruckSize(weights, days)).toEqual(output);
  });
});
