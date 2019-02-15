exports.up = function (knex, Promise) {
  return knex.schema.createTable('content', table => {
      table.increments()
      table.string('name').notNullable().defaultsTo('')
      table.text('description').notNullable().defaultsTo('')
      table.string('catagory_id').notNullable().defaultsTo('')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('content')
};