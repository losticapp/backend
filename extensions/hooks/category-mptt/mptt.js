// Modified Preorder Tree Traversal Algorithm Implementation
module.exports.mptt = function mptt(tree, start = 1) {
  let cursor = start

  tree.forEach(node => {
    node.lft = cursor++
    cursor = mptt(node.subCategories, cursor)
    node.rgt = cursor++
  })

  return cursor
}

function makeNode(category) {
  return {
    id: category.id,
    record: category,
    subCategories: [],
    lft: null,
    rgt: null,
  }
}

function findNode(tree, nodeId) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    const { id, subCategories } = node

    if (id === nodeId) {
      return node
    }

    // recursively walk over the sub categories
    const matchingSubCategory = findNode(subCategories, nodeId)

    if (matchingSubCategory) {
      return matchingSubCategory
    }
  }

  return null
}

function sortTree(tree) {
  tree.sort((a, b) => {
    if (a.record.ordering_number && a.record.ordering_number > 0 && b.record.ordering_number && b.record.ordering_number > 0) {
      return a.record.ordering_number - b.record.ordering_number
    }

    return a.id - b.id
  })
}

module.exports.buildTree = function buildTree(categories) {
  const tree = []

  categories.forEach(cat => {
    const node = makeNode(cat)
    const parent = cat.parent_category
    const parentNode = parent && findNode(tree, parent)

    if (parent && !parentNode) {
      throw new Error(`Parent node with id ${parent} couldn't be found for the category "${cat.title}" (id: ${cat.id})`)
    }

    if (parentNode) {
      parentNode.subCategories.push(node)

      sortTree(parentNode.subCategories)

      return
    }

    tree.push(node)
  })

  sortTree(tree)

  return tree
}
