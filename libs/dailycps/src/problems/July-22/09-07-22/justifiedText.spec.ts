import { justifyText } from './justifiedText';

describe('Justified text', () => {
  test('.justifyText()', () => {
    const input = [
      'the',
      'quick',
      'brown',
      'fox',
      'jumps',
      'over',
      'the',
      'lazy',
      'dog',
    ];
    expect(justifyText(input, 16)).toEqual([
      'the  quick brown',
      'fox  jumps  over',
      'the   lazy   dog',
    ]);
  });
});
