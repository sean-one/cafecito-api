
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orderlines').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('orderlines').insert([
        { id: 1, order_id: 1, product_id: 1, quantity: 2, price_each: 10 },
        { id: 2, order_id: 2, product_id: 2, quantity: 1, price_each: 10 },
        { id: 3, order_id: 2, product_id: 5, quantity: 2, price_each: 5 },
        { id: 4, order_id: 3, product_id: 4, quantity: 5, price_each: 10 },
        { id: 5, order_id: 4, product_id: 6, quantity: 1, price_each: 10 },
        { id: 6, order_id: 5, product_id: 2, quantity: 3, price_each: 10 },
        { id: 7, order_id: 5, product_id: 6, quantity: 1, price_each: 10 },
        { id: 8, order_id: 5, product_id: 5, quantity: 2, price_each: 5 }
      ]);
    });
};
