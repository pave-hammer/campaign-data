
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'Organizations'},
        {id: 2, name: 'Places_of_Interest'},
        {id: 3, name: 'People_of_Interest'},
        {id: 4, name: 'Dieties'}
      ]);
    });
};
