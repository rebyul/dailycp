import { BinaryNode } from '../../../lib';
import { treeSums } from './tree-sums';

describe('Tree sums', () => {
  it('Tree with one node returns empty array', () => {
    const res = treeSums(new BinaryNode(1), 5);
    expect(res).toEqual(null);
  });

  it('Tree with valid compliments returns correctly', (done) => {
    const res = treeSums(new BinaryNode(1, new BinaryNode(4)), 5);
    const expectedSet = new Set([1, 4]);
    if (res === null) {
      done.fail('Invalid empty array in valid tree');
      return;
    }
    assertTreeSum(res, expectedSet);
    done();
  });

  it('More complex tree with valid compliment', (done) => {
    const res = treeSums(
      new BinaryNode(
        1,
        new BinaryNode(2, new BinaryNode(4), new BinaryNode(6)),
        new BinaryNode(3)
      ),
      10
    );
    const expectedSet = new Set([4, 6]);
    if (res === null) {
      done.fail('Invalid empty array in valid tree');
      return;
    }
    assertTreeSum(res, expectedSet);
    done();
  });

  it('Example in question', (done) => {
    const res = treeSums(
      new BinaryNode(
        10,
        new BinaryNode(5),
        new BinaryNode(15, new BinaryNode(11), new BinaryNode(15))
      ),
      20
    );

    const expectedSet = new Set([5, 15]);
    if (res === null) {
      done.fail('Invalid empty array in valid tree');
      return;
    }
    assertTreeSum(res, expectedSet);
    done();
  });
});

function assertTreeSum(res: [number, number], expectedSet: Set<number>) {
  expect(res).not.toBeNull();
  expect(res.length).toEqual(expectedSet.size);
  for (const v of res) {
    expect(expectedSet.has(v)).toEqual(true);
  }
}
