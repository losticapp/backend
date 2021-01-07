'use strict'
require('dotenv').config()
const directus = require('directus')
const database = require('directus/dist/database')

module.exports.up = function (next) {
  Promise.resolve((async () => {
    const schema = await database.schemaInspector.overview()
    const permissionsService = new directus.PermissionsService({ schema })
    const relationsService = new directus.RelationsService({ schema })
    const imagesRelation = await relationsService.readSingleton({
      filter: {
        one_collection: 'notices',
        one_field: 'images'
      }
    })
    
    await permissionsService.create({
      role: null,
      collection: 'notices',
      action: 'read',
      fields: '*'
    })

    // images table can be read by all the users
    await permissionsService.create({
      role: null,
      collection: imagesRelation.many_collection,
      action: 'read',
      fields: '*'
    })
  })())
    .then(next)
    .catch(next)
}

module.exports.down = function (next) {
  Promise.resolve((async () => {
    const schema = await database.schemaInspector.overview()
    const permissionsService = new directus.PermissionsService({ schema })
    const relationsService = new directus.RelationsService({ schema })
    const imagesRelation = await relationsService.readSingleton({
      filter: {
        one_collection: 'notices',
        one_field: 'images'
      }
    })

    await permissionsService.deleteByQuery({
      filter: {
        collection: 'notices',
        role: { _null: true },
        action: 'read',
        fields: '*'
      }
    })

    await permissionsService.deleteByQuery({
      filter: {
        collection: imagesRelation.many_collection,
        role: { _null: true },
        action: 'read',
        fields: '*'
      }
    })
  })())
    .then(next)
    .catch(next)
}
