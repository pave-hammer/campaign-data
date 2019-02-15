
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('catagories').del()
    .then(function () {
      // Inserts seed entries
      return knex('catagories').insert([
        {id: 1, name: 'Organizations'},
        {id: 2, name: 'Places of Interest'},
        {id: 3, name: 'Persons of Interest'},
        {id: 4, name: 'Dieties'}
      ]);
    });
};
