
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        { client_id: 1, order_total: 10 },
        { client_id: 3, order_total: 20 },
        { client_id: 4, order_total: 50 },
        { client_id: 2, order_total: 10 },
        { client_id: 5, order_total: 50 }
      ]);
    });
};
