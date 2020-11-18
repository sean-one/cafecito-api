
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('menu_schedule').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('menu_schedule').insert([
        { id: 1, weekday: "monday", product_id: 1 },
        { id: 2, weekday: "monday", product_id: 3 },
        { id: 3, weekday: "monday", product_id: 5 },
        { id: 4, weekday: "tuesday", product_id: 2 },
        { id: 5, weekday: "tuesday", product_id: 4 },
        { id: 6, weekday: "tuesday", product_id: 5 },
        { id: 7, weekday: "tuesday", product_id: 1 },
        { id: 8, weekday: "wednesday", product_id: 1 },
        { id: 9, weekday: "wednesday", product_id: 2 },
        { id: 10, weekday: "wednesday", product_id: 3 },
        { id: 11, weekday: "thursday", product_id: 4 },
        { id: 12, weekday: "thursday", product_id: 5 },
        { id: 13, weekday: "friday", product_id: 1 },
        { id: 14, weekday: "friday", product_id: 3 },
        { id: 15, weekday: "friday", product_id: 4 },
        { id: 16, weekday: "saturday", product_id: 1 },
        { id: 17, weekday: "saturday", product_id: 2 },
        { id: 18, weekday: "saturday", product_id: 3 },
        { id: 19, weekday: "saturday", product_id: 4 },
        { id: 20, weekday: "saturday", product_id: 5 },
        { id: 21, weekday: "sunday", product_id: 2 },
        { id: 22, weekday: "sunday", product_id: 3 },
        { id: 23, weekday: "sunday", product_id: 5 }
      ]);
    });
};
