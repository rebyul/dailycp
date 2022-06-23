/**
 * Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.

For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.

You can assume that the messages are decodable. For example, '001' is not allowed.
 */

export function noOfCiphers(input: string) {
  // let noCombinations = 1;

  // for (let i = input.length; i >= 0; i--) {
  //   const char = input.charAt(i),
  //     prev = input.charAt(i - 1);

  //   const number = Number(`${prev}${char}`);

  //   if (number <= 26 && number >= 10) {
  //     noCombinations++;
  //   }
  // }

  // return noCombinations;

  // Dynamic programming

  // Cache is an array of current combinations at i'th character
  const cache = new Array<Array<string>>(input.length + 1).fill([]);

  cache[0] = [''];
  for (let i = 0; i < input.length; i++) {
    const currentChar = input.charAt(i);

    cache[i + 1].push(
      ...cache[i].map((c) => `${c}${numToChar(Number(currentChar))}`)
    );

    if (i + 2 <= input.length) {
      const nextChar = input.charAt(i + 1);
      const number = Number(`${currentChar}${nextChar}`);

      if (number <= 26 && number >= 10) {
        // a is charcode 97 so since a=1, add 96
        cache[i + 2] = cache[i].map((c) => {
          return `${c}${numToChar(number)}`;
        });
      }
    }
  }
  console.log(cache);
  return cache[input.length].length;
}

function numToChar(num: number) {
  return String.fromCharCode(num + 96);
}
