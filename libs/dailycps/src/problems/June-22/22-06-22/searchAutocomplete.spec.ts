import { autocomplete } from './searchAutocomplete';

describe('Search autocomplete', () => {
  test.each([
    [['dog', 'deer', 'deal'], 'de', ['deer', 'deal']],
    [['dog', 'deer', 'deal'], 'gf', []],
    [['dog', 'deer', 'deal'], 'dog', ['dog']],
    [['dog', 'deer', 'deal'], 'd', ['dog', 'deer', 'deal']],
    [['dog', 'deer', 'hey'], 'd', ['dog', 'deer']],
    [['dog', 'deer', 'hey'], 'he', ['hey']],
    [['dog', 'doge', 'dogeee'], 'dog', ['dog', 'doge', 'dogeee']],
  ])('.autocomplete(%p, %s) returns %p', (input, searchTerm, output) => {
    expect(autocomplete(input, searchTerm)).toEqual(output);
  });
});
