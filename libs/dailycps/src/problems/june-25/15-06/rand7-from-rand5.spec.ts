import { rand5, rand7 } from './rand7-from-rand5';

describe('Rand7 from rand5', () => {
  test('rand5 returns number between 1 and 5', () => {
    for (let i = 0; i < 10; i++) {
      const num = rand5();
      expect(num).toBeLessThanOrEqual(5);
      expect(num).toBeGreaterThanOrEqual(1);
    }
  });

  test('rand7 returns number between 1 and 7', () => {
    for (let i = 0; i < 10; i++) {
      const num = rand7();
      expect(num).toBeLessThanOrEqual(7);
      expect(num).toBeGreaterThanOrEqual(1);
    }
  });

  test('rand7 distribution', () => {
    const counts = new Array(8).fill(0); // Index 0 unused, indices 1-7 for counts
    const numTrials = 5000000;

    for (let i = 0; i < numTrials; i++) {
      const r = rand7();
      counts[r]++;
    }

    for (let i = 1; i <= 7; i++) {
      const percentage = counts[i] / numTrials;
      expect(percentage).toBeCloseTo(1 / 7, 1);
    }
  });
});
