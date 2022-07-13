import { findLongestAbsoluteFilePath } from './longestAbsoluteFilePath';
describe('Longest Absolute File Path', () => {
  test.each([
    ['test.ext', 'test.ext'],
    ['dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext', 'dir/subdir2/file.ext'],
    [
      'dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext',
      'dir/subdir2/subsubdir2/file2.ext',
      // 32
    ],
  ])('.findLongestAbsoluteFilePath(%s) returns %s', (input, output) => {
    expect(findLongestAbsoluteFilePath(input)).toEqual(output);
  });
});
