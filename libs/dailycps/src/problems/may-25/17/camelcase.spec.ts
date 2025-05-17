import { toCamelCase } from './camelcase';

describe('Camel case', () => {
  test.each([
    ['DB_NAME', 'dbName'],
    ['APP_NAME', 'appName'],
    ['_FIRST_UDS', 'firstUds'],
    ['APP_NAME_', 'appName'],
    ['_____APP_____NAME___', 'appName'],
  ])('Given toCamelCase(%s) returns %s', (input, output) => {
    expect(toCamelCase(input)).toEqual(output);
  });
});
