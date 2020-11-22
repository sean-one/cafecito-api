
exports.up = async function(knex) {
    await knex.schema.createTable('menu_schedule', menu_schedule => {
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
  // add constraint to keep unique product id per weekday
  await knex.schema.raw(`ALTER TABLE menu_schedule ADD CONSTRAINT one_per_day UNIQUE (weekday, product_id);`)
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('menu_schedule');
};
