export function toCamelCase(str: string): string {
  let res = '';
  let nextUppercase = false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '_') {
      if (res.length > 0) nextUppercase = true;
      continue;
    }
    res += nextUppercase ? str[i].toUpperCase() : str[i].toLowerCase();
    nextUppercase = false;
  }

  return res;
}

export function toEnvCase(str: string): string {
  let res = '';

  for (const char of str) {
    if (char.match(/[A-Z]/)) {
      res += '_';
    }
    res += char.toUpperCase();
  }

  return res;
}
