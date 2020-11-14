
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        { id: 1, client_id: 1, order_total: 10, created_at: new Date(), updated_at: new Date() },
        { id: 2, client_id: 3, order_total: 20, created_at: new Date(), updated_at: new Date() },
        { id: 3, client_id: 4, order_total: 50, created_at: new Date(), updated_at: new Date() },
        { id: 4, client_id: 2, order_total: 10, created_at: new Date(), updated_at: new Date() },
        { id: 5, client_id: 5, order_total: 50, created_at: new Date(), updated_at: new Date() }
      ]);
    });
};
