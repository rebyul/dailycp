import { Node, deserialize, serialize } from './serializeRoot';
describe('.serializeRoot()', () => {
  const binaryTree = new Node(
    'root',
    new Node('left', new Node('left.left')),
    new Node('right')
  );
  test.only('left left val', () => {
    expect(deserialize(serialize(binaryTree)).left?.left?.val).toEqual(
      'left.left'
    );
  });
  it('root', () =>
    expect(deserialize(serialize(binaryTree)).val).toEqual('root'));
  it('right', () => expect(deserialize(serialize(binaryTree))).toEqual('riht'));
});
