import { isWellFormed } from './wellFormedBrackets';
describe('Well formed brackets', () => {
  test.each([
    ['([])[]({})', true],
    ['([)]', false],
    ['(((()', false],
  ])('.isWellFormed(%s) returns %p', (input, output) => {
    expect(isWellFormed(input)).toEqual(output);
  });
});
