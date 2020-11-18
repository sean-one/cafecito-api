
exports.up = function(knex) {
    return knex.schema.createTable('orders', orders => {
        orders.increments('id');

        orders
            .integer('client_id')
            // .unsigned()
            // .notNullable()
            // keep customer id in event parent customer is deleted
            .references('id')
            .inTable('clients')
            .onDelete('NO ACTION');
        
        orders
            .date('order_date')
            .defaultTo(knex.fn.now())
            .notNullable();
        
        orders
            .float('order_total')
        
        orders.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
};
