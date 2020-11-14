
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('menu_schedule').del()
    .then(function () {
      // Inserts seed entries
      return knex('menu_schedule').insert([
        { id: 1, weekday: "monday", product_id: 1, created_at: new Date(), updated_at: new Date() },
        { id: 2, weekday: "monday", product_id: 3, created_at: new Date(), updated_at: new Date() },
        { id: 3, weekday: "monday", product_id: 5, created_at: new Date(), updated_at: new Date() },
        { id: 4, weekday: "tuesday", product_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 5, weekday: "tuesday", product_id: 4, created_at: new Date(), updated_at: new Date() },
        { id: 6, weekday: "tuesday", product_id: 5, created_at: new Date(), updated_at: new Date() },
        { id: 7, weekday: "tuesday", product_id: 1, created_at: new Date(), updated_at: new Date() },
        { id: 8, weekday: "wednesday", product_id: 1, created_at: new Date(), updated_at: new Date() },
        { id: 9, weekday: "wednesday", product_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 10, weekday: "wednesday", product_id: 3, created_at: new Date(), updated_at: new Date() },
        { id: 11, weekday: "thursday", product_id: 4, created_at: new Date(), updated_at: new Date() },
        { id: 12, weekday: "thursday", product_id: 5, created_at: new Date(), updated_at: new Date() },
        { id: 13, weekday: "friday", product_id: 1, created_at: new Date(), updated_at: new Date() },
        { id: 14, weekday: "friday", product_id: 3, created_at: new Date(), updated_at: new Date() },
        { id: 15, weekday: "friday", product_id: 4, created_at: new Date(), updated_at: new Date() },
        { id: 16, weekday: "saturday", product_id: 1, created_at: new Date(), updated_at: new Date() },
        { id: 17, weekday: "saturday", product_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 18, weekday: "saturday", product_id: 3, created_at: new Date(), updated_at: new Date() },
        { id: 19, weekday: "saturday", product_id: 4, created_at: new Date(), updated_at: new Date() },
        { id: 20, weekday: "saturday", product_id: 5, created_at: new Date(), updated_at: new Date() },
        { id: 21, weekday: "sunday", product_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 22, weekday: "sunday", product_id: 3, created_at: new Date(), updated_at: new Date() },
        { id: 23, weekday: "sunday", product_id: 5, created_at: new Date(), updated_at: new Date() }
      ]);
    });
};
