const mptt = require('./mptt')

async function updateCategoryLeftRightValues(tree, database) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    const { subCategories } = node

    await database.table('categories').update({ lft: node.lft, rgt: node.rgt }).where('id', '=', node.id)
    await updateCategoryLeftRightValues(subCategories, database)
  }
}

async function applyMPTT(database) {
  const categories = await database.table('categories').select()
  const tree = mptt.buildTree(categories)

  // apply mptt algorithm
  mptt.mptt(tree)

  // update left and right values
  await updateCategoryLeftRightValues(tree, database)
}

module.exports = function registerHook(context) {
  return {
    'items.*': async function (meta) {
      if (meta.collection === 'categories') {
        await applyMPTT(context.database)
      }
    },
  };
};
