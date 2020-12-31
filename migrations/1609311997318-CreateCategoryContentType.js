'use strict'
require('dotenv').config()
const directus = require('directus')
const database = require('directus/dist/database')

module.exports.up = function (next) {
  Promise.resolve((async () => {
    let schema = await database.schemaInspector.overview()
    const collectionsService = new directus.CollectionsService({ schema })

    await collectionsService.create(createCategoryCollectionData)

    // update schema
    schema = await database.schemaInspector.overview()

    // add parent category
    const fieldsService = new directus.FieldsService({ schema })
    const relationsService = new directus.RelationsService({ schema })

    await fieldsService.createField('categories', addParentCategoryFieldData)
    await fieldsService.createField('categories', addSubCategoriesFieldData)
    await relationsService.create(addParentCategorySubCategoriesRelationData)
  })())
    .then(next)
    .catch(next)
}

module.exports.down = function (next) {
  database.schemaInspector.overview().then(async schema => {
    const collectionsService = new directus.CollectionsService({ schema })

    await collectionsService.delete('categories')
  })
    .then(next)
    .catch(next)
}

const createCategoryCollectionData = {
  "collection": "categories",
  "fields": [
    {
      "field": "id",
      "type": "integer",
      "schema": {
        "name": "id",
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
        "display": null,
        "display_options": null,
        "field": "id",
        "group": null,
        "hidden": true,
        "interface": "numeric",
        "locked": false,
        "note": null,
        "options": null,
        "readonly": true,
        "sort": null,
        "special": null,
        "translations": null,
        "width": "full"
      }
    },
    {
      "field": "title",
      "type": "string",
      "schema": {
        "name": "title",
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
        "display": "raw",
        "display_options": null,
        "field": "title",
        "group": null,
        "hidden": false,
        "interface": "text-input",
        "locked": false,
        "note": null,
        "options": {
          "trim": true
        },
        "readonly": false,
        "sort": null,
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
      "field": "date_created",
      "type": "timestamp",
      "schema": {
        "name": "date_created",
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
        "display": "datetime",
        "display_options": {
          "relative": true
        },
        "field": "date_created",
        "group": null,
        "hidden": true,
        "interface": "datetime",
        "locked": false,
        "note": null,
        "options": null,
        "readonly": true,
        "sort": null,
        "special": [
          "date-created"
        ],
        "translations": null,
        "width": "half"
      }
    },
    {
      "field": "date_updated",
      "type": "timestamp",
      "schema": {
        "name": "date_updated",
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
        "display": "datetime",
        "display_options": {
          "relative": true
        },
        "field": "date_updated",
        "group": null,
        "hidden": true,
        "interface": "datetime",
        "locked": false,
        "note": null,
        "options": null,
        "readonly": true,
        "sort": null,
        "special": [
          "date-updated"
        ],
        "translations": null,
        "width": "half"
      }
    },
    {
      "field": "lft",
      "type": "integer",
      "schema": {
        "name": "lft",
        "data_type": "int",
        "default_value": null,
        "max_length": null,
        "numeric_precision": 10,
        "numeric_scale": 0,
        "is_nullable": true,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "display": "raw",
        "display_options": null,
        "field": "lft",
        "group": null,
        "hidden": false,
        "interface": "numeric",
        "locked": false,
        "note": null,
        "options": {
          "min": 1
        },
        "readonly": false,
        "sort": null,
        "special": null,
        "translations": null,
        "width": "full"
      }
    },
    {
      "field": "ordering_number",
      "type": "integer",
      "schema": {
        "name": "ordering_number",
        "data_type": "int",
        "default_value": null,
        "max_length": null,
        "numeric_precision": 10,
        "numeric_scale": 0,
        "is_nullable": true,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "display": "raw",
        "display_options": null,
        "field": "ordering_number",
        "group": null,
        "hidden": false,
        "interface": "numeric",
        "locked": false,
        "note": null,
        "options": {
          "min": 1
        },
        "readonly": false,
        "sort": null,
        "special": null,
        "translations": null,
        "width": "full"
      }
    },
    {
      "field": "rgt",
      "type": "integer",
      "schema": {
        "name": "rgt",
        "data_type": "int",
        "default_value": null,
        "max_length": null,
        "numeric_precision": 10,
        "numeric_scale": 0,
        "is_nullable": true,
        "is_primary_key": false,
        "has_auto_increment": false,
        "foreign_key_column": null,
        "foreign_key_table": null,
        "comment": ""
      },
      "meta": {
        "display": "raw",
        "display_options": null,
        "field": "rgt",
        "group": null,
        "hidden": false,
        "interface": "numeric",
        "locked": false,
        "note": null,
        "options": {
          "min": 1
        },
        "readonly": false,
        "sort": null,
        "special": null,
        "translations": null,
        "width": "full"
      }
    },
    {
      "field": "user_created",
      "type": "string",
      "schema": {
        "name": "user_created",
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
        "display": "user",
        "display_options": null,
        "field": "user_created",
        "group": null,
        "hidden": true,
        "interface": "user",
        "locked": false,
        "note": null,
        "options": {
          "display": "both"
        },
        "readonly": true,
        "sort": null,
        "special": [
          "user-created"
        ],
        "translations": null,
        "width": "half"
      }
    },
    {
      "field": "user_updated",
      "type": "string",
      "schema": {
        "name": "user_updated",
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
        "display": "user",
        "display_options": null,
        "field": "user_updated",
        "group": null,
        "hidden": true,
        "interface": "user",
        "locked": false,
        "note": null,
        "options": {
          "display": "both"
        },
        "readonly": true,
        "sort": null,
        "special": [
          "user-updated"
        ],
        "translations": null,
        "width": "half"
      }
    }
  ],
  "meta": {
    "singleton": false
  }
}

const addParentCategoryFieldData = {
  "field": "parent_category",
  "type": "integer",
  "schema": {
      "is_nullable": true,
      "numeric_precision": null,
      "numeric_scale": null
  },
  "meta": {
      "hidden": false,
      "interface": "many-to-one",
      "options": {
          "template": "{{title}}"
      },
      "display": "related-values",
      "display_options": {
          "template": "{{title}}"
      },
      "readonly": false,
      "translations": [
          {
              "language": "en-US",
              "translation": "Parent Category"
          },
          {
              "language": "tr-TR",
              "translation": "Üst Kategori"
          }
      ]
  }
}

const addSubCategoriesFieldData = {
  "field": "sub_categories",
  "collection": "categories",
  "meta": {
      "special": "o2m",
      "interface": "one-to-many",
      "translations": [
          {
              "language": "en-US",
              "translation": "Sub Categories"
          },
          {
              "language": "tr-TR",
              "translation": "Alt Kategoriler"
          }
      ]
  }
}

const addParentCategorySubCategoriesRelationData = {
  "many_collection": "categories",
  "many_field": "parent_category",
  "many_primary": "id",
  "one_collection": "categories",
  "one_primary": "id",
  "one_field": "sub_categories"
}
