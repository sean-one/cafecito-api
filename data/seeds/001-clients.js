
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        { name: 'john doe', password: 'password123', email: 'johndoe@gmail.com' },
        { name: 'jane doe', password: 'password123', email: 'janedoe@mybusiness.com' },
        { name: 'jon smith', password: 'password123', email: 'jsmith@aol.com' },
        { name: 'debbie dallas', password: 'password123', email: 'doubled@yahoo.com' },
        { name: 'danny boy', password: 'password123', email: 'coffiedan@gmail.com' }
      ]);
    });
};
