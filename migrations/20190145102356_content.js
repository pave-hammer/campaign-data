exports.up = function (knex, Promise) {
  return knex.schema.createTable('content', table => {
      table.increments()
      table.string('name').notNullable().defaultsTo('')
      table.text('description').notNullable().defaultsTo('')
      table.integer('catagory_id').notNullable().defaultsTo(0)
        .references('id')
        .inTable('catagories')
        .onDelete('CASCADE')
        .index();
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('content')
};