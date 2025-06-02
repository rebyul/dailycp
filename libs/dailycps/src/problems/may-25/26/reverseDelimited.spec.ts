import { reverseDelimited } from './reverseDelimited';

describe('Split delimited', () => {
  test.each([
    ['hello/world:here', 'here/world:hello'],
    ['here/world:hello', 'hello/world:here'],
    ['hello/world:here/', 'here/world:hello/'],
    ['hello', 'hello'],
    ['//', '//'],
  ])('reverseDelimited(%s) returns %s', (input, expected) => {
    expect(reverseDelimited(input)).toEqual(expected);
  });

  // I think this case is flawed
  test('Follow-up', () => {
    expect(reverseDelimited('hello/world:here/')).not.toEqual(
      'hello//world:here'
    );
  });
});
