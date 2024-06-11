import { generatePrimeSmallerThan} from './primesSmallerThanNGenerator';

describe('Primes generator', () => {
      // yields the largest prime smaller than the input number
      it('should yield the largest prime smaller than the input number', () => {
        const input = 10;
        const generator = generatePrimeSmallerThan(input);
        const result = generator.next().value;
        expect(result).toBe(7);
      });

          // input is 0
    it('should yield undefined when input is 0', () => {
      const input = 0;
      const generator = generatePrimeSmallerThan(input);
      const result = generator.next().value;
      expect(result).toBeUndefined();
    });
})
