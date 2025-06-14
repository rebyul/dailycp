export function wallMaze(
  maze: boolean[][],
  start: [number, number],
  end: [number, number]
) {
  // Lets try djikstra's
  /** Create a set of all unvisited nodes
   * How am i going to store the set indices? comma separated strings work fine
   */
  const distanceMap = createDistanceMap(maze);
  const unvisitedSet = new Set<string>(distanceMap.keys());

  /**
   * Assign to every node a distance from start value: for the starting node,
   * it is zero, and for all other nodes, it is infinity, since initially no path
   * is known to these nodes. During execution, the distance of a node N is the
   * length of the shortest path discovered so far between the starting node and N
   */
  distanceMap.set(getMapKey(start[0], start[1]), 0);

  /**
   * From the unvisited set, select the current node to be the one with the smallest
   * (finite) distance; initially, this is the starting node (distance zero).
   * If the unvisited set is empty, or contains only nodes with infinite distance
   * (which are unreachable), then the algorithm terminates by skipping to step 6,
   * If the only concern is the path to a target node. Otherwise, the algorithm continues.
   */

  /**
   * For the current node, consider all of its unvisited neighbours and update
   * their distances through the current node; compare the newly calculated distance
   * to the one currently assigned to the neighbor and assign the smaller to it.
   * For example, if the current node A is marked with a distance of 6, and
   * the edge connecting it with its neighbor B has length 2, then the distance
   * to B through A is 6+2 =8. If B was previously marked with a distance greater than
   * 8, then update it to 8 (the path to B through A is shorter). Otherwise, keep
   * its current distance (the path to B through A is not the shorted)
   */
  do {
    let currentKey: string | undefined = undefined,
      currentMinDistance = Number.MAX_SAFE_INTEGER;
    for (const [key, distance] of distanceMap.entries()) {
      if (distance < currentMinDistance && unvisitedSet.has(key)) {
        currentKey = key;
        currentMinDistance = Number.MAX_SAFE_INTEGER;
      }
    }

    if (currentKey === undefined) {
      throw Error('No starting board');
    }

    const [currentY, currentX] = reverseKey(currentKey);
    const currentDistance = distanceMap.get(currentKey);

    if (currentDistance === undefined) {
      throw Error(`${currentY}, ${currentX} not found in distance map`);
    }

    for (const targetNode of scanNeighbours(currentY, currentX)) {
      visit(
        maze,
        targetNode[0],
        targetNode[1],
        currentDistance,
        1,
        distanceMap,
        unvisitedSet
      );
    }
    /**
     * After considering all of the current node's unvisited neighbours, the
     * current node is removed from the unvisited set. Thus a visited node is
     * never rechecked, which is correct because the distance record on the current
     * node is minimal (as ensured in step 3), and thus final. Repeat from step 3
     */
    unvisitedSet.delete(getMapKey(currentY, currentX));
  } while (unvisitedSet.size > 0);

  return distanceMap.get(getMapKey(end[0], end[1]));
}

export function scanNeighbours(y: number, x: number): [number, number][] {
  return [
    [y + 1, x],
    [y - 1, x],
    [y, x + 1],
    [y, x - 1],
  ];
}

export function createDistanceMap(maze: boolean[][]): Map<string, number> {
  return new Map(
    maze.flatMap((_, y) =>
      _.map((_, x) => [getMapKey(y, x), Number.MAX_SAFE_INTEGER])
    )
  );
}

function getMapKey(y: number, x: number) {
  return `${y},${x}`;
}

function reverseKey(key: string): [number, number] {
  const tokenized = key.split(',');
  if (tokenized.length !== 2) {
    throw Error(`Invalid key ${key}`);
  }
  return [Number.parseInt(tokenized[0]), Number.parseInt(tokenized[1])];
}

function visit(
  maze: boolean[][],
  y: number,
  x: number,
  currentDistance: number,
  distance: number,
  distanceMap: Map<string, number>,
  unvisited: Set<string>
) {
  const targetKey = getMapKey(y, x);
  // This destination doesn't exist on the maze
  if (!distanceMap.has(targetKey)) {
    return;
  }

  // We've been here
  if (!unvisited.has(targetKey)) {
    return;
  }

  // Hit a wall
  if (maze[y][x] === true) {
    // Remove from unvisited. Dont need to ever visit
    unvisited.delete(targetKey);
    return;
  }

  const currentDestinationDistance = distanceMap.get(targetKey)!;

  if (currentDistance + distance < currentDestinationDistance) {
    distanceMap.set(targetKey, currentDistance + distance);
    return currentDistance + distance;
  }
  return;
}
