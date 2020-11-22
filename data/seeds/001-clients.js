
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        { name: 'john doe', email: 'johndoe@gmail.com' },
        { name: 'jane doe', email: 'janedoe@mybusiness.com' },
        { name: 'jon smith', email: 'jsmith@aol.com' },
        { name: 'debbie dallas', email: 'doubled@yahoo.com' },
        { name: 'danny boy', email: 'coffiedan@gmail.com' }
      ]);
    });
};
