
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('catagories').del()
    .then(function () {
      // Inserts seed entries
      return knex('catagories').insert([
        {id: 1, name: 'Organizations'},
        {id: 2, name: 'Places'},
        {id: 3, name: 'Dieties'}
      ]);
    });
};
