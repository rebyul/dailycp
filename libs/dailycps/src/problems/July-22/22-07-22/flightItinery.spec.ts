import { findItinery } from './flightItinery';

describe('Flight itinery', () => {
  test.each([
    [
      [
        ['SFO', 'HKO'],
        ['YYZ', 'SFO'],
        ['YUL', 'YYZ'],
        ['HKO', 'ORD'],
      ],
      'YUL',
      ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD'],
    ],
    [
      [
        ['SFO', 'COM'],
        ['COM', 'YYZ'],
      ],
      'COM',
      null,
    ],
    [
      [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'C'],
        ['C', 'A'],
      ],
      'A',
      ['A', 'B', 'C', 'A', 'C'],
    ],
  ])('.findItinery(%p, %s) returns %p', (flights, start, itinery) => {
    expect(findItinery(flights, start)).toEqual(itinery);
  });
});
