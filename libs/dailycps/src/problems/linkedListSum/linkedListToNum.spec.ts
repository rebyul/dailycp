import { LinkedListNode } from '../../lib/LinkedListNode';
import { addTwoNumbers } from './linkedListSum';

describe('listToNum', () => {
  test.each([
    {
      l1: new LinkedListNode(2, new LinkedListNode(4, new LinkedListNode(3))),
      l2: new LinkedListNode(5, new LinkedListNode(6, new LinkedListNode(4))),
      output: new LinkedListNode(
        7,
        new LinkedListNode(0, new LinkedListNode(8))
      ),
    },
    {
      l1: new LinkedListNode(0),
      l2: new LinkedListNode(0),
      output: new LinkedListNode(0),
    },
    {
      l1: new LinkedListNode(
        9,
        new LinkedListNode(
          9,
          new LinkedListNode(
            9,
            new LinkedListNode(
              9,
              new LinkedListNode(
                9,
                new LinkedListNode(9, new LinkedListNode(9))
              )
            )
          )
        )
      ),
      l2: new LinkedListNode(
        9,
        new LinkedListNode(9, new LinkedListNode(9, new LinkedListNode(9)))
      ),
      output: new LinkedListNode(
        8,
        new LinkedListNode(
          9,
          new LinkedListNode(
            9,
            new LinkedListNode(
              9,
              new LinkedListNode(
                0,
                new LinkedListNode(
                  0,
                  new LinkedListNode(0, new LinkedListNode(1))
                )
              )
            )
          )
        )
      ),
    },
    {
      l1: new LinkedListNode(1, new LinkedListNode(0, new LinkedListNode(9))),
      l2: new LinkedListNode(5, new LinkedListNode(7, new LinkedListNode(8))),
      output: new LinkedListNode(
        6,
        new LinkedListNode(7, new LinkedListNode(7, new LinkedListNode(1)))
      ),
    },
    {
      l1: new LinkedListNode(
        1,
        new LinkedListNode(
          0,
          new LinkedListNode(
            0,
            new LinkedListNode(0, new LinkedListNode(0, new LinkedListNode(1)))
          )
        )
      ),
      l2: new LinkedListNode(5, new LinkedListNode(6, new LinkedListNode(4))),
      output: new LinkedListNode(
        6,
        new LinkedListNode(
          6,
          new LinkedListNode(
            4,
            new LinkedListNode(0, new LinkedListNode(0, new LinkedListNode(1)))
          )
        )
      ),
    },
    {
      l1: new LinkedListNode(9),
      l2: new LinkedListNode(4),
      output: new LinkedListNode(3, new LinkedListNode(1)),
    },
  ])('.addTwoNumbers($l1, $l2)', ({ l1, l2, output }) =>
    expect(addTwoNumbers(l1, l2)).toEqual(output)
  );
});
