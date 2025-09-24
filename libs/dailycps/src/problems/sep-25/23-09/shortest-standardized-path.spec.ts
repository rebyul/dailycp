import { shortestStandardizedPath } from './shortest-standardized-path';

describe('Shortest standardized path', () => {
  test('empty path returns empty string', () => {
    expect(shortestStandardizedPath('')).toEqual('');
  });

  test('root path returns root path', () => {
    expect(shortestStandardizedPath('/')).toEqual('/');
  });

  test('single path returns single path', () =>
    expect(shortestStandardizedPath('/usr')).toEqual('/usr'));

  test('path with . correctly truncates', () => {
    expect(shortestStandardizedPath('/usr/.')).toEqual('/usr');
  });

  test('path begins with .', () => {
    expect(shortestStandardizedPath('./usr')).toEqual('/usr');
  });

  test('path begins with ..', () => {
    expect(shortestStandardizedPath('../usr')).toEqual('/usr');
  });

  test('path ends with .', () => {
    expect(shortestStandardizedPath('./usr/.')).toEqual('/usr');
  });

  test('path begins with ..', () => {
    expect(shortestStandardizedPath('/usr/..')).toEqual('/');
  });

  test('path with .. correctly traverses up', () => {
    expect(shortestStandardizedPath('/usr/../test')).toEqual('/test');
  });

  test('path with double slashes', () => {
    expect(shortestStandardizedPath('/usr//test')).toEqual('/usr/test');
  });

  test.each([['/usr/bin/../bin/./scripts/../', '/usr/bin/']])(
    'given %s, shortestStandardizedPath returns %s',
    (given, want) => {
      expect(shortestStandardizedPath(given)).toEqual(want);
    }
  );
});
