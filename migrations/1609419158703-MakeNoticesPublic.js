'use strict'
require('dotenv').config()
const directus = require('directus')
const database = require('directus/dist/database')

module.exports.up = function (next) {
  database.schemaInspector.overview().then(async schema => {
    const permissions = new directus.PermissionsService({ schema })

    await permissions.create({
      role: null,
      collection: 'notices',
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

    await permissionsService.deleteByQuery({
      filter: {
        collection: 'notices',
        role: { _null: true },
        action: 'read',
        fields: '*'
      }
    })
  })
    .then(next)
    .catch(next)
};
