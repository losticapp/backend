const categories = require('./fixtures/categories.json')
const expected = require('./fixtures/categories-mptt-nodes.json')
const { mptt, buildTree } = require('./mptt')

test('mptt', () => {
  const tree = buildTree(categories)

  mptt(tree)

  expect(tree).toStrictEqual(expected)
})

test('fail if parent category id is invalid', () => {
  expect(() => {
    const invalidNodes = [{
      id: 1,
      title: 'test',
      parent_category: 123
    }]

    buildTree(invalidNodes)
  }).toThrow(`Parent node with id 123 couldn't be found for the category "test" (id: 1)`)
})
