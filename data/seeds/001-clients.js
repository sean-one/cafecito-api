
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        { id: 1, name: 'john doe', email: 'johndoe@gmail.com', created_at: new Date(), updated_at: new Date() },
        { id: 2, name: 'jane doe', email: 'janedoe@mybusiness.com', created_at: new Date(), updated_at: new Date() },
        { id: 3, name: 'jon smith', email: 'jsmith@aol.com', created_at: new Date(), updated_at: new Date() },
        { id: 4, name: 'debbie dallas', email: 'doubled@yahoo.com', created_at: new Date(), updated_at: new Date() },
        { id: 5, name: 'danny boy', email: 'coffiedan@gmail.com', created_at: new Date(), updated_at: new Date() }
      ]);
    });
};
