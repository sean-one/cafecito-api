

exports.up = function(knex) {
    return knex.schema.createTable('products', products => {
        products.increments('id');

        products
            .string('item')
            .notNullable()
            .unique();
        
        products
            .string('item_description')
            .notNullable();
        
        products
            .float('item_price')
            .notNullable();
        
        products
            .integer('item_inventory')
            .unsigned()
            .notNullable()
            .defaultTo(0);
        
        products.timestamps(true, true)
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products');
};
