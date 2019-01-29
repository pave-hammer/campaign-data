exports.up = function (knex, Promise) {
  return knex.schema.createTable('carinhall-data', table => {
      table.increments()
      table.integer('org_id').notNullable().references('id').inTable('organizations').index()
      table.string('name').notNullable().defaultsTo('')
      table.text('description').notNullable().defaultsTo('')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('carinhall-data')
};