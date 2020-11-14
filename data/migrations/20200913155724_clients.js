
exports.up = function(knex) {
    return knex.schema.createTable('clients', clients => {
        clients.increments('id');

        clients
            .string('name')
            .notNullable();
        
        clients
            .string('email')
            .notNullable()
            .unique();
        
        clients.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('clients');
};
