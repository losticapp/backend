'use strict'
require('dotenv').config()
const directus = require('directus')
const database = require('directus/dist/database')

const data = {
  collections: {
    categories: {"collection":"categories","fields":[{"field":"id","type":"integer","meta":{"hidden":true,"interface":"numeric","readonly":true},"schema":{"is_primary_key":true,"has_auto_increment":true}},{"field":"sort","type":"integer","meta":{"interface":"numeric","hidden":true},"schema":{}},{"field":"user_created","type":"uuid","meta":{"special":["user-created"],"interface":"user","options":{"display":"both"},"display":"user","readonly":true,"hidden":true,"width":"half"},"schema":{}},{"field":"date_created","type":"timestamp","meta":{"special":["date-created"],"interface":"datetime","readonly":true,"hidden":true,"width":"half","display":"datetime","display_options":{"relative":true}},"schema":{}},{"field":"user_updated","type":"uuid","meta":{"special":["user-updated"],"interface":"user","options":{"display":"both"},"display":"user","readonly":true,"hidden":true,"width":"half"},"schema":{}},{"field":"date_updated","type":"timestamp","meta":{"special":["date-updated"],"interface":"datetime","readonly":true,"hidden":true,"width":"half","display":"datetime","display_options":{"relative":true}},"schema":{}}],"meta":{"sort_field":"sort","singleton":false}},
  },
  relations: {
    categoryUser: [{"many_collection":"categories","many_field":"user_created","many_primary":"id","one_collection":"directus_users","one_primary":"id"},{"many_collection":"categories","many_field":"user_updated","many_primary":"id","one_collection":"directus_users","one_primary":"id"}],
    parentCategoryAndSubCategories: {"many_collection":"categories","many_field":"parent_category","many_primary":"id","one_collection":"categories","one_primary":"id","one_field":"sub_categories"},
  },
  fields: {
    title: {"field":"title","type":"string","schema":{"is_nullable":false,"numeric_precision":null,"numeric_scale":null},"meta":{"hidden":false,"interface":"text-input","options":{"trim":true},"display":"raw","readonly":false,"translations":[{"language":"en-US","translation":"Title"},{"language":"tr-TR","translation":"Başlık"}]}},
    parentCategory: {"field":"parent_category","type":"integer","schema":{"is_nullable":true,"numeric_precision":null,"numeric_scale":null},"meta":{"hidden":false,"interface":"many-to-one","options":{"template":"{{title}}"},"display":"related-values","display_options":{"template":"{{title}}"},"readonly":false,"translations":[{"language":"en-US","translation":"Parent Category"},{"language":"tr-TR","translation":"Üst Kategori"}]}},
    subCategories: {"field":"sub_categories","collection":"categories","meta":{"special":"o2m","interface":"one-to-many","translations":[{"language":"en-US","translation":"Sub Categories"},{"language":"tr-TR","translation":"Alt Kategoriler"}]}},
  }
}

module.exports.up = function (next) {
  Promise.resolve((async () => {
    let fieldsService = null
    let relationsService = null
    let schema = await database.schemaInspector.overview()
    const collectionsService = new directus.CollectionsService({ schema })
    
    await collectionsService.create(data.collections.categories)

    schema = await database.schemaInspector.overview()
    fieldsService = new directus.FieldsService({ schema })
    relationsService = new directus.RelationsService({ schema })
    
    await relationsService.create(data.relations.categoryUser)
    await fieldsService.createField(data.collections.categories.collection, data.fields.title)
    await fieldsService.createField(data.collections.categories.collection, data.fields.parentCategory)
    await fieldsService.createField(data.collections.categories.collection, data.fields.subCategories)
    await relationsService.create(data.relations.parentCategoryAndSubCategories)
  })())
    .then(next)
    .catch(next)
}

module.exports.down = function (next) {
  Promise.resolve((async () => {
    const schema = await database.schemaInspector.overview()
    const collectionsService = new directus.CollectionsService({ schema })

    await collectionsService.delete(data.collections.categories.collection)
  })())
    .then(next)
    .catch(next)
}
