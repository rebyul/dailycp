/**
 * Given an unordered list of flights taken by someone,
 *  each represented as (origin, destination) pairs, and a starting airport,
 * compute the person's itinerary. If no such itinerary exists,
 *  return null. If there are multiple possible itineraries, return the lexicographically smallest one.
 * All flights must be used in the itinerary.

For example, given the list of flights [('SFO', 'HKO'), ('YYZ', 'SFO'), ('YUL', 'YYZ'), ('HKO', 'ORD')]
and starting airport 'YUL', you should return the list ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD'].

Given the list of flights [('SFO', 'COM'), ('COM', 'YYZ')] and starting airport 'COM', you should return null.

Given the list of flights [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')] and starting airport 'A',
you should return the list ['A', 'B', 'C', 'A', 'C'] even though ['A', 'C', 'A', 'B', 'C']
is also a valid itinerary. However, the first one is lexicographically smaller.
 */

export function findItinery(flights: string[][], start: string) {
  const itinerary = findFlights(flights, [start]);
  return itinerary;
}

function findStartingFlights(flights: string[][], current: string) {
  return flights.filter((f) => f[0] === current);
}

const findFlights = (
  flights: string[][],
  current: string[]
): string[] | null => {
  if (flights.length === 0) return current;

  const currentTown = current[current.length - 1];

  const availableCurrentFlights = findStartingFlights(flights, currentTown);

  if (
    availableCurrentFlights === null ||
    availableCurrentFlights.length === 0
  ) {
    return null;
  }

  const orderedNext = availableCurrentFlights
    .map((f) => f[1])
    .sort((a, b) => (a < b ? -1 : 1));

  const potentialItineries = orderedNext
    .map((n) => {
      return findFlights(
        flights.filter((f) => f[0] !== currentTown || f[1] !== n),
        [...current, n]
      );
    })
    .filter((i) => i !== null);

  return potentialItineries && potentialItineries.length > 0
    ? potentialItineries[0]
    : null;
};
