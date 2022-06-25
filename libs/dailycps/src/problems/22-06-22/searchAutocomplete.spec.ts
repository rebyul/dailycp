import { autocomplete } from './searchAutocomplete';

describe('Search autocomplete', () => {
  test.each([
    [['dog', 'deer', 'deal'], 'de', ['deer', 'deal']],
    [['dog', 'deer', 'deal'], 'gf', []],
  ])('.autocomplete(%p, %s) returns %p', (input, searchTerm, output) => {
    expect(autocomplete(input, searchTerm)).toEqual(output);
  });
});
