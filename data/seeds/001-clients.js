
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        { id: 1, name: 'john doe', email: 'johndoe@gmail.com' },
        { id: 2, name: 'jane doe', email: 'janedoe@mybusiness.com' },
        { id: 3, name: 'jon smith', email: 'jsmith@aol.com' },
        { id: 4, name: 'debbie dallas', email: 'doubled@yahoo.com' },
        { id: 5, name: 'danny boy', email: 'coffiedan@gmail.com' }
      ]);
    });
};
