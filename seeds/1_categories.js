
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(() => {
      // Inserts seed entries
      return knex('categories').insert([
        {categoryName: 'Organizations'},
        {categoryName: 'Places_of_Interest'},
        {categoryName: 'People_of_Interest'}
      ]);
    });
};
