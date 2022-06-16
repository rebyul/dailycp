import { isHoppable, isHoppableDp, reverseTraversal } from './towerHopper';

describe('Tower hopper', () => {
  test.each([
    [[1, 0], false],
    [[4, 2, 0, 0, 2, 0], true],
  ])('.isHoppable(%p)', (tower, outcome) => {
    expect(isHoppable(tower)).toEqual(outcome);
  });

  test.each([
    [[1, 0], false],
    [[4, 2, 0, 0, 2, 0], true],
  ])('.isHoppableDp(%p)', (tower, outcome) => {
    expect(isHoppableDp(tower)).toEqual(outcome);
  });

  test.each([
    [[1, 0], false],
    [[4, 2, 0, 0, 2, 0], true],
  ])('.reverseTraversal(%p)', (tower, outcome) => {
    expect(reverseTraversal(tower)).toEqual(outcome);
  });
});
