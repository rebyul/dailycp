/**
 * This problem was asked by Google.

Suppose we represent our file system by a string in the following manner:

The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:

dir
    subdir1
    subdir2
        file.ext

The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.

The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:

dir
    subdir1
        file1.ext
        subsubdir1
    subdir2
        subsubdir2
            file2.ext

The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.

We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).

Given a string representing the file system in the above format, return the length of the longest absolute path to a file in the abstracted file system. If there is no file in the system, return 0.

Note:

The name of a file contains at least a period and an extension.

The name of a directory or sub-directory will not contain a period.
 */

export function findLongestAbsoluteFilePath(input: string): string {
  const tokens = input.split('\n');
  const files = findFiles(tokens, 0);
  // console.log(
  //   '🚀 ~ file: longestAbsoluteFilePath.ts ~ line 41 ~ findLongestAbsoluteFilePath ~ files',
  //   files
  // );

  return (
    files
      // .filter((f) => !f.startsWith('\t'))
      .sort((a, b) => b.length - a.length)?.[0]
      .replace(/(\n)|(\t)/g, '')
  );
}

function findFiles(input: string[], currentDepth = 0): string[] {
  const files: string[] = [];

  for (let index = 0; index < input.length; index++) {
    const element = input[index];

    if (findDepth(element) < currentDepth) {
      return files;
    }
    // if it's a directory,
    if (!isFile(element) && findDepth(element) === currentDepth) {
      const deeperFiles = findFiles(input.slice(index + 1), currentDepth + 1);
      if (deeperFiles.length > 0) {
        files.push(...deeperFiles.map((f) => `${element}/${f}`));
      }
    }
    // If it's a file and it matches the current depth
    else if (findDepth(element) === currentDepth) {
      files.push(element);
    }
  }

  return files;
}

function isFile(input: string) {
  return input.endsWith('.ext');
}

function findDepth(input: string) {
  return input.match(/(\t)/g)?.length || 0;
}
