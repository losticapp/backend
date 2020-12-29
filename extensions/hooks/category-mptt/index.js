const mptt = require('./mptt')

async function updateCategoryLeftRightValues(tree, database) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    const { subCategories } = node

    await database.table('category').update({ lft: node.lft, rgt: node.rgt }).where('id', '=', node.id)
    await updateCategoryLeftRightValues(subCategories, database)
  }
}

async function applyMPTT(database) {
  const categories = await database.table('category').select()
  const tree = mptt.buildTree(categories)

  // apply mptt algorithm
  mptt.mptt(tree)

  // update left and right values
  await updateCategoryLeftRightValues(tree, database)
}

module.exports = function registerHook(context) {
  return {
    'items.*': async function (meta) {
      console.log('after all the item events:', meta)

      if (meta.collection === 'category') {
        await applyMPTT(context.database)
      }
    },
  };
};
