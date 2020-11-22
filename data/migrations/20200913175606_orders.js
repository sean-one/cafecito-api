
exports.up = function(knex) {
    return knex.schema.createTable('orders', orders => {
        orders.increments('id');

        orders
            .integer('client_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('clients')
        
        orders
            .date('order_date')
            .defaultTo(knex.fn.now())
            .notNullable();
        
        orders
            .float('order_total')
        
        orders.timestampstz(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
};
