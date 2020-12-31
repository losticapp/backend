'use strict'
require('dotenv').config()
const directus = require('directus')
const database = require('directus/dist/database')

module.exports.up = function (next) {
  database.schemaInspector.overview().then(async schema => {
    const permissions = new directus.PermissionsService({ schema })
    const relationsService = new directus.RelationsService({ schema })
    const imagesRelation = await relationsService.readSingleton({
      filter: {
        one_collection: 'notices',
        one_field: 'images'
      }
    })

    await permissions.create({
      role: null,
      collection: 'notices',
      action: 'read',
      fields: '*'
    })

    // images table can be read by all the users
    await permissions.create({
      role: null,
      collection: imagesRelation.many_collection,
      action: 'read',
      fields: '*'
    })
  })
    .then(next)
    .catch(next)
}

module.exports.down = function (next) {
  database.schemaInspector.overview().then(async schema => {
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
  })
    .then(next)
    .catch(next)
};
