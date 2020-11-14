
exports.up = function(knex) {
    return knex.schema.createTable('orderlines', orderlines => {
        orderlines.increments('id');

        orderlines
            .integer('order_id')
            .unsigned()
            .notNullable()
            // delete orderlines when parent order is deleted
            .references('id')
            .inTable('orders')
            .onDelete('CASCADE');

        orderlines
            .integer('product_id')
            .unsigned()
            .notNullable()
            // keep product id number in event parent product is deleted
            .references('id')
            .inTable('products')
            .onDelete('NO ACTION');
        
        orderlines
            .integer('quantity')
            .unsigned()
            .notNullable();

        orderlines
            .float('price_each')
            .notNullable();
        
        orderlines.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orderlines');
};
