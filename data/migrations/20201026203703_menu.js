
exports.up = function(knex) {
    return knex.schema.createTable('menu_schedule', menu_schedule => {
        menu_schedule.increments('id');

        menu_schedule
            .enu('weekday', ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'])
            .notNullable();
        
        menu_schedule
            .integer('product_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('products')
            .onDelete('CASCADE');

        menu_schedule.timestamps(true, true);
      
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('menu_schedule');
};
