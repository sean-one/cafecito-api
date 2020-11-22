
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('menu_schedule').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('menu_schedule').insert([
        { weekday: "monday", product_id: 1 },
        { weekday: "monday", product_id: 3 },
        { weekday: "monday", product_id: 5 },
        { weekday: "tuesday", product_id: 2 },
        { weekday: "tuesday", product_id: 4 },
        { weekday: "tuesday", product_id: 5 },
        { weekday: "tuesday", product_id: 1 },
        { weekday: "wednesday", product_id: 1 },
        { weekday: "wednesday", product_id: 2 },
        { weekday: "wednesday", product_id: 3 },
        { weekday: "thursday", product_id: 4 },
        { weekday: "thursday", product_id: 5 },
        { weekday: "friday", product_id: 1 },
        { weekday: "friday", product_id: 3 },
        { weekday: "friday", product_id: 4 },
        { weekday: "saturday", product_id: 1 },
        { weekday: "saturday", product_id: 2 },
        { weekday: "saturday", product_id: 3 },
        { weekday: "saturday", product_id: 4 },
        { weekday: "saturday", product_id: 5 },
        { weekday: "sunday", product_id: 2 },
        { weekday: "sunday", product_id: 3 },
        { weekday: "sunday", product_id: 5 }
      ]);
    });
};
