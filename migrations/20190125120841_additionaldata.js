exports.up = function (knex, Promise) {
  return knex.schema.createTable('additionaldata', table => {
      table.increments()
      table.string('title').notNullable().defaultsTo('')
      table.text('description').notNullable().defaultsTo('')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('additionaldata')
};