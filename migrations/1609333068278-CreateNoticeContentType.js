'use strict'
require('dotenv').config()
const directus = require('directus')
const database = require('directus/dist/database')

const data = {
  collections: {
    notices: {"collection":"notices","fields":[{"field":"id","type":"integer","meta":{"hidden":true,"interface":"numeric","readonly":true},"schema":{"is_primary_key":true,"has_auto_increment":true}},{"field":"user_created","type":"uuid","meta":{"special":["user-created"],"interface":"user","options":{"display":"both"},"display":"user","readonly":true,"hidden":true,"width":"half"},"schema":{}},{"field":"date_created","type":"timestamp","meta":{"special":["date-created"],"interface":"datetime","readonly":true,"hidden":true,"width":"half","display":"datetime","display_options":{"relative":true}},"schema":{}},{"field":"user_updated","type":"uuid","meta":{"special":["user-updated"],"interface":"user","options":{"display":"both"},"display":"user","readonly":true,"hidden":true,"width":"half"},"schema":{}},{"field":"date_updated","type":"timestamp","meta":{"special":["date-updated"],"interface":"datetime","readonly":true,"hidden":true,"width":"half","display":"datetime","display_options":{"relative":true}},"schema":{}}],"meta":{"singleton":false}},
    noticeImages: {"collection":"notices_directus_files_notice_images","meta":{"hidden":true,"icon":"import_export"},"fields":[{"field":"id","type":"integer","schema":{"has_auto_increment":true},"meta":{"hidden":true}}]},
  },
  fields: {
    title: {"field":"title","type":"string","schema":{"is_nullable":false,"numeric_precision":null,"numeric_scale":null},"meta":{"hidden":false,"interface":"text-input","options":{"trim":true},"display":"raw","readonly":false,"translations":[{"language":"en-US","translation":"Title"},{"language":"tr-TR","translation":"Başlık"}]}},
    description: {"field":"description","type":"text","schema":{"is_nullable":true,"numeric_precision":null,"numeric_scale":null},"meta":{"hidden":false,"interface":"wysiwyg","options":null,"display":"raw","display_options":null,"readonly":false,"special":null,"translations":[{"language":"en-US","translation":"Description"},{"language":"tr-TR","translation":"Açıklama"}]}},
    category: {"field":"category","type":"integer","schema":{"is_nullable":false,"numeric_precision":null,"numeric_scale":null},"meta":{"hidden":false,"interface":"many-to-one","options":{"template":"{{title}}"},"display":"related-values","display_options":{"template":"{{title}}"},"readonly":false,"translations":[{"language":"en-US","translation":"Category"},{"language":"tr-TR","translation":"Kategori"}]}},
    images: {"field":"images","type":null,"meta":{"hidden":false,"interface":"files","display":"raw","readonly":false,"special":["files"],"translations":[{"language":"en-US","translation":"Images"},{"language":"tr-TR","translation":"Resimler"}]}},
    noticeImages: {
      noticesId: {"collection":"notices_directus_files_notice_images","field":"notices_id","type":"integer","schema":{},"meta":{"hidden":true}},
      filesId: {"collection":"notices_directus_files_notice_images","field":"directus_files_id","type":"uuid","schema":{},"meta":{"hidden":true}},
    },
  },
  relations: {
    notice: {
      user: [{"many_collection":"notices","many_field":"user_created","many_primary":"id","one_collection":"directus_users","one_primary":"id"},{"many_collection":"notices","many_field":"user_updated","many_primary":"id","one_collection":"directus_users","one_primary":"id"}],
      category: {"many_collection":"notices","many_field":"category","many_primary":"id","one_collection":"categories","one_primary":"id"},
    },
    noticeImages: {
      images: {"many_collection":"notices_directus_files_notice_images","many_field":"notices_id","many_primary":"id","one_collection":"notices","one_field":"images","one_primary":"id","junction_field":"directus_files_id"},
      files: {"many_collection":"notices_directus_files_notice_images","many_field":"directus_files_id","many_primary":"id","one_collection":"directus_files","one_field":null,"one_primary":"id","junction_field":"notices_id"},
    }
  },
}

module.exports.up = function (next) {
  Promise.resolve((async () => {
    let fieldsService = null
    let relationsService = null
    let schema = await database.schemaInspector.overview()
    const collectionsService = new directus.CollectionsService({ schema })
    
    await collectionsService.create(data.collections.notices)
    await collectionsService.create(data.collections.noticeImages)

    schema = await database.schemaInspector.overview()
    fieldsService = new directus.FieldsService({ schema })
    relationsService = new directus.RelationsService({ schema })
    
    await fieldsService.createField(data.collections.notices.collection, data.fields.title)
    await fieldsService.createField(data.collections.notices.collection, data.fields.description)
    await fieldsService.createField(data.collections.notices.collection, data.fields.category)
    await fieldsService.createField(data.collections.notices.collection, data.fields.images)

    await fieldsService.createField(data.collections.noticeImages.collection, data.fields.noticeImages.noticesId)
    await fieldsService.createField(data.collections.noticeImages.collection, data.fields.noticeImages.filesId)

    await relationsService.create(data.relations.notice.user)
    await relationsService.create(data.relations.notice.category)

    await relationsService.create(data.relations.noticeImages.images)
    await relationsService.create(data.relations.noticeImages.files)
  })())
    .then(next)
    .catch(next)
}

module.exports.down = function (next) {
  Promise.resolve((async () => {
    const schema = await database.schemaInspector.overview()
    const collectionsService = new directus.CollectionsService({ schema })

    await collectionsService.delete(data.collections.notices.collection)
    await collectionsService.delete(data.collections.noticeImages.collection)
  })())
    .then(next)
    .catch(next)
}
