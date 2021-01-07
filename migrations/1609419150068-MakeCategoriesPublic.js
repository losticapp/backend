'use strict'
require('dotenv').config()
const directus = require('directus')
const database = require('directus/dist/database')

const ALLOWED_FIELDS = 'id,title,lft,rgt,ordering_number,parent_category,sub_categories'

module.exports.up = function (next) {
  Promise.resolve((async () => {
    const schema = await database.schemaInspector.overview()
    const permissionsService = new directus.PermissionsService({ schema })
    
    await permissionsService.create({
      role: null,
      collection: 'categories',
      action: 'read',
      fields: ALLOWED_FIELDS
    })
  })())
    .then(next)
    .catch(next)
}

module.exports.down = function (next) {
  Promise.resolve((async () => {
    const schema = await database.schemaInspector.overview()
    const permissionsService = new directus.PermissionsService({ schema })

    await permissionsService.deleteByQuery({
      filter: {
        collection: 'categories',
        role: { _null: true },
        action: 'read',
        fields: ALLOWED_FIELDS
      }
    })
  })())
    .then(next)
    .catch(next)
}
