

exports.up = async function(knex) {
    await knex.schema.createTable('products', products => {
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
    // add constraint to keep field a positive number
    await knex.schema.raw(`ALTER TABLE products ADD CONSTRAINT positive_inventory CHECK (item_inventory >= 0);`)
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products');
};
