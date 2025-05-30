import { BinaryNode } from '@dailycp/lib';
import { cartesianTree } from './geminiCartensianTree';

describe('Cartesian tree', () => {
  test('Empty case', () => {
    expect(cartesianTree([])).toBeNull();
  });

  test('Single input', () => {
    expect(cartesianTree([1])).toEqual(new BinaryNode(1));
  });

  test('Two nodes', () => {
    expect(cartesianTree([3, 2])).toEqual(new BinaryNode(2, new BinaryNode(3)));
  });

  test('Three nodes', () => {
    const res = cartesianTree([3, 2, 6]);
    // console.log(res);
    expect(res).toEqual(
      new BinaryNode(2, new BinaryNode(3), new BinaryNode(6))
    );
  });

  test.each([
    [
      [3, 2, 6, 1, 9],
      new BinaryNode(
        1,
        new BinaryNode(2, new BinaryNode(3), new BinaryNode(6)),
        new BinaryNode(9)
      ),
    ],
    [
      [5, 4, 3, 2, 1],
      new BinaryNode(
        1,
        new BinaryNode(
          2,
          new BinaryNode(3, new BinaryNode(4, new BinaryNode(5)))
        )
      ),
    ],
    [[10, 5, 12], new BinaryNode(5, new BinaryNode(10), new BinaryNode(12))],
  ])('Given sequence %s, returns %o', (seq, res) => {
    expect(cartesianTree(seq)).toEqual(res);
  });
});
