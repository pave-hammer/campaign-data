exports.up = function (knex, Promise) {
  return knex.schema.createTable('organizations', table => {
      table.increments()
      table.string('name').notNullable().defaultsTo('')
      table.text('description').notNullable().defaultsTo('')
      table.string('affiliations').notNullable().defaultsTo('')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('organizations')
};