
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orderlines').del()
    .then(function () {
      // Inserts seed entries
      return knex('orderlines').insert([
        { id: 1, order_id: 1, product_id: 1, quantity: 2, price_each: 10, created_at: new Date(), updated_at: new Date() },
        { id: 2, order_id: 2, product_id: 2, quantity: 1, price_each: 10, created_at: new Date(), updated_at: new Date() },
        { id: 3, order_id: 2, product_id: 5, quantity: 2, price_each: 5, created_at: new Date(), updated_at: new Date() },
        { id: 4, order_id: 3, product_id: 4, quantity: 5, price_each: 10, created_at: new Date(), updated_at: new Date() },
        { id: 5, order_id: 4, product_id: 6, quantity: 1, price_each: 10, created_at: new Date(), updated_at: new Date() },
        { id: 6, order_id: 5, product_id: 2, quantity: 3, price_each: 10, created_at: new Date(), updated_at: new Date() },
        { id: 7, order_id: 5, product_id: 6, quantity: 1, price_each: 10, created_at: new Date(), updated_at: new Date() },
        { id: 8, order_id: 5, product_id: 5, quantity: 2, price_each: 5, created_at: new Date(), updated_at: new Date() }
      ]);
    });
};
