/**
 * This problem was asked by Quora.

Given an absolute pathname that may have . or .. as part of it, return the shortest standardized path.

For example, given "/usr/bin/../bin/./scripts/../", return "/usr/bin/".
*/

export function shortestStandardizedPath(path: string): string {
  const visited: string[] = [];
  if (path.length === 0) return '';

  const tokens = path.split('/');
  for (const t of tokens) {
    if (t === '.') {
      if (visited.length === 0) {
        visited.push('');
      }
      continue;
    }

    if (t === '..') {
      if (visited.length === 0) {
        visited.push('');
      } else {
        visited.pop();
      }
      continue;
    }
    visited.push(t);
  }

  return visited.join('/') || '/';
}
