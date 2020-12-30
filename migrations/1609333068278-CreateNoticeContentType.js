'use strict'
require('dotenv').config()
const axios = require('axios').default
const { runInAdminContext } = require('../utils/migrations/run-in-admin-context')

module.exports.up = function (next) {
  runInAdminContext(async meta => {
    const opts = {
      headers: meta.authHeaders
    }

    await axios.post(`${meta.addr}/collections`, createNoticeCollectionData, opts)
    // category field
    await axios.post(`${meta.addr}/fields/notice`, addCategoryFieldData, opts)
    await axios.post(`${meta.addr}/relations`, addCategoryRelationData, opts)
    // images field
    await axios.post(`${meta.addr}/collections`, createNoticeDirectusFilesCollectionData, opts)
    await axios.post(`${meta.addr}/relations`, addNoticeFileRelationData, opts)
    await axios.post(`${meta.addr}/relations`, addFileRelationData, opts)
  })
    .then(next)
    .catch(next)
}

module.exports.down = function (next) {
  runInAdminContext(async meta => {
    const opts = {
      headers: meta.authHeaders
    }

    await axios.delete(`${meta.addr}/collections/notice`, opts)
    await axios.delete(`${meta.addr}/collections/${createNoticeDirectusFilesCollectionData.collection}`, opts)
  })
    .then(next)
    .catch(next)
}

const createNoticeCollectionData = {
  "collection": "notice",
  "fields": [
    {
      "collection": "notice",
      "field": "title",
      "type": "string",
      "schema": {
        "name": "title",
        "table": "notice",
        "data_type": "varchar",
        "default_value": null,
        "max_length": 255,
        "numeric_precision": null,
        "numeric_scale": null,
        "is_nullable": false,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "collection": "notice",
        "display": "raw",
        "display_options": null,
        "field": "title",
        "group": null,
        "hidden": false,
        "id": 88,
        "interface": "text-input",
        "locked": false,
        "note": null,
        "options": {
          "trim": true
        },
        "readonly": false,
        "sort": 2,
        "special": null,
        "translations": [
          {
            "language": "en-US",
            "translation": "Title"
          },
          {
            "language": "tr-TR",
            "translation": "Başlık"
          }
        ],
        "width": "full"
      }
    },
    {
      "field": "images",
      "type": null,
      "meta": {
        "hidden": false,
        "interface": "files",
        "display": "raw",
        "readonly": false,
        "special": ["files"],
        "translations": [{
          "language": "en-US",
          "translation": "Images"
        }, {
          "language": "tr-TR",
          "translation": "Resimler"
        }]
      }
    },
    {
      "collection": "notice",
      "field": "date_created",
      "type": "timestamp",
      "schema": {
        "name": "date_created",
        "table": "notice",
        "data_type": "timestamp",
        "default_value": null,
        "max_length": null,
        "numeric_precision": null,
        "numeric_scale": null,
        "is_nullable": true,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "collection": "notice",
        "display": "datetime",
        "display_options": {
          "relative": true
        },
        "field": "date_created",
        "group": null,
        "hidden": true,
        "id": 85,
        "interface": "datetime",
        "locked": false,
        "note": null,
        "options": null,
        "readonly": true,
        "sort": 5,
        "special": [
          "date-created"
        ],
        "translations": null,
        "width": "half"
      }
    },
    {
      "collection": "notice",
      "field": "date_updated",
      "type": "timestamp",
      "schema": {
        "name": "date_updated",
        "table": "notice",
        "data_type": "timestamp",
        "default_value": null,
        "max_length": null,
        "numeric_precision": null,
        "numeric_scale": null,
        "is_nullable": true,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "collection": "notice",
        "display": "datetime",
        "display_options": {
          "relative": true
        },
        "field": "date_updated",
        "group": null,
        "hidden": true,
        "id": 87,
        "interface": "datetime",
        "locked": false,
        "note": null,
        "options": null,
        "readonly": true,
        "sort": 7,
        "special": [
          "date-updated"
        ],
        "translations": null,
        "width": "half"
      }
    },
    {
      "collection": "notice",
      "field": "description",
      "type": "text",
      "schema": {
        "name": "description",
        "table": "notice",
        "data_type": "text",
        "default_value": null,
        "max_length": 65535,
        "numeric_precision": null,
        "numeric_scale": null,
        "is_nullable": true,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "collection": "notice",
        "display": "raw",
        "display_options": null,
        "field": "description",
        "group": null,
        "hidden": false,
        "id": 89,
        "interface": "wysiwyg",
        "locked": false,
        "note": null,
        "options": null,
        "readonly": false,
        "sort": 3,
        "special": null,
        "translations": [
          {
            "language": "en-US",
            "translation": "Description"
          },
          {
            "language": "tr-TR",
            "translation": "Açıklama"
          }
        ],
        "width": "full"
      }
    },
    {
      "collection": "notice",
      "field": "id",
      "type": "integer",
      "schema": {
        "name": "id",
        "table": "notice",
        "data_type": "int",
        "default_value": null,
        "max_length": null,
        "numeric_precision": 10,
        "numeric_scale": 0,
        "is_nullable": false,
        "is_primary_key": true,
        "has_auto_increment": true,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "collection": "notice",
        "display": null,
        "display_options": null,
        "field": "id",
        "group": null,
        "hidden": true,
        "id": 83,
        "interface": "numeric",
        "locked": false,
        "note": null,
        "options": null,
        "readonly": true,
        "sort": 1,
        "special": null,
        "translations": null,
        "width": "full"
      }
    },
    {
      "collection": "notice",
      "field": "user_created",
      "type": "string",
      "schema": {
        "name": "user_created",
        "table": "notice",
        "data_type": "char",
        "default_value": null,
        "max_length": 36,
        "numeric_precision": null,
        "numeric_scale": null,
        "is_nullable": true,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "collection": "notice",
        "display": "user",
        "display_options": null,
        "field": "user_created",
        "group": null,
        "hidden": true,
        "id": 84,
        "interface": "user",
        "locked": false,
        "note": null,
        "options": {
          "display": "both"
        },
        "readonly": true,
        "sort": 4,
        "special": [
          "user-created"
        ],
        "translations": null,
        "width": "half"
      }
    },
    {
      "collection": "notice",
      "field": "user_updated",
      "type": "string",
      "schema": {
        "name": "user_updated",
        "table": "notice",
        "data_type": "char",
        "default_value": null,
        "max_length": 36,
        "numeric_precision": null,
        "numeric_scale": null,
        "is_nullable": true,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "collection": "notice",
        "display": "user",
        "display_options": null,
        "field": "user_updated",
        "group": null,
        "hidden": true,
        "id": 86,
        "interface": "user",
        "locked": false,
        "note": null,
        "options": {
          "display": "both"
        },
        "readonly": true,
        "sort": 6,
        "special": [
          "user-updated"
        ],
        "translations": null,
        "width": "half"
      }
    }, {
      "field": "latitude",
      "meta": {
          "display": "raw",
          "display_options": null,
          "hidden": false,
          "interface": "numeric",
          "options": {
              "step": 0
          },
          "readonly": false,
          "special": null,
          "translations": [
              {
                  "language": "en-US",
                  "translation": "Latitude"
              },
              {
                  "language": "tr-TR",
                  "translation": "Enlem"
              }
          ]
      },
      "schema": {
          "is_nullable": true,
          "numeric_precision": null,
          "numeric_scale": 6
      },
      "type": "decimal"
    }, {
      "field": "longitude",
      "meta": {
          "display": "raw",
          "display_options": null,
          "hidden": false,
          "interface": "numeric",
          "options": {
              "step": 0
          },
          "readonly": false,
          "special": null,
          "translations": [
              {
                  "language": "en-US",
                  "translation": "Longitude"
              },
              {
                  "language": "tr-TR",
                  "translation": "Boylam"
              }
          ]
      },
      "schema": {
          "is_nullable": true,
          "numeric_precision": null,
          "numeric_scale": 6
      },
      "type": "decimal"
    }
  ],
  "meta": {
    "singleton": true
  }
}

const addCategoryFieldData = {
  "field": "category",
  "type": "integer",
  "schema": {
    "is_nullable": false,
    "numeric_precision": null,
    "numeric_scale": null
  },
  "meta": {
    "hidden": false,
    "interface": "many-to-one",
    "options": { "template": "{{title}}" },
    "display": "related-values",
    "display_options": { "template": "{{title}}" },
    "readonly": false,
    "translations": [{
      "language": "en-US",
      "translation": "Category"
    }, {
      "language": "tr-TR",
      "translation": "Kategori"
    }]
  }
}

const addCategoryRelationData = {
  "many_collection": "notice",
  "many_field": "category",
  "many_primary": "id",
  "one_collection": "category",
  "one_primary": "id"
}

const createNoticeDirectusFilesCollectionData = {
  "collection": "notice_directus_files_2",
  "meta": {
      "hidden": true,
      "icon": "import_export"
  },
  "fields": [
      {
          "field": "id",
          "type": "integer",
          "schema": {
              "has_auto_increment": true
          },
          "meta": {
              "hidden": true
          }
      },
      {
        "field": "notice_id",
        "meta": {
            "hidden": true
        },
        "schema": {},
        "type": "integer"
      },
      {
        "field": "directus_files_id",
        "meta": {
            "hidden": true
        },
        "schema": {},
        "type": "uuid"
    }
  ]
}

const addNoticeFileRelationData = {
  "junction_field": "directus_files_id",
  "many_collection": createNoticeDirectusFilesCollectionData.collection,
  "many_field": "notice_id",
  "many_primary": "id",
  "one_collection": "notice",
  "one_field": "images",
  "one_primary": "id"
}

const addFileRelationData = {
  "junction_field": "notice_id",
  "many_collection": createNoticeDirectusFilesCollectionData.collection,
  "many_field": "directus_files_id",
  "many_primary": "id",
  "one_collection": "directus_files",
  "one_field": null,
  "one_primary": "id"
}
