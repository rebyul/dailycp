import { runLengthDecode, runLengthEncode } from './runLengthEncoding';

describe('Run length encode/decode', () => {
  test.each([['AAAABBBCCDAA', '4A3B2C1D2A']])(
    'encode(%s) equals %s and vice versa',
    (input, output) => {
      expect(runLengthEncode(input)).toEqual(output);
      expect(runLengthDecode(output)).toEqual(input);
    }
  );
});
