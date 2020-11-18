
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { id: 1, item: 'hibiscus cafecito', item_description: 'cafecito coffe mixed with hibiscus flower, handcrafted', item_price: 10, item_inventory: 10 },
        { id: 2, item: 'killer cold brew', item_description: 'cafecito coffe poured over ice', item_price: 10, item_inventory: 10 },
        { id: 3, item: 'cafecito cup', item_description: 'cafecito coffee black', item_price: 5, item_inventory: 15 },
        { id: 4, item: 'cherry lime hibiscus cafecito', item_description: 'cafecito coffe mixed with hibiscus flower, splashed with cherry & lime', item_price: 10, item_inventory: 5 },
        { id: 5, item: 'celery juice', item_description: 'cold pressed celery juice', item_price: 5, item_inventory: 15 },
        { id: 6, item: 'delagona coffee', item_description: 'cafecito coffee delagona style with oat milk', item_price: 10, item_inventory: 10 },
      ]);
    });
};
