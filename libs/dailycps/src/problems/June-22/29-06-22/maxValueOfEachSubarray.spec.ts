import { findMaxValueOfEachSubarray } from './maxValueOfEachSubarray';
describe('Sum of max in each subarray', () => {
  test.each([[[10, 5, 2, 7, 8, 7], 3, [10, 7, 8, 8]]])(
    '.findMaxValueOfEachSubarray(%p, %d) returns %p',
    (array, k, output) => {
      expect(findMaxValueOfEachSubarray(array, k)).toEqual(output);
    }
  );
});
