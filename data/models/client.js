const db = require('../dbConfig');

module.exports = {
    find,
    findByUsername,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('clients')
        // .select('id', 'name', 'email');
}

function findByUsername(username) {
    return db('clients')
        .where({ name: username })
        .first();
}

function findById(id) {
    return db('clients')
        // .select( 'name', 'email' )
        .where(id)
        .first();
}

async function add(client) {
    return await db('clients').insert(client, ['id', 'name', 'email'])
}

function update(id, changes) {
    return db('clients')
        .where(id)
        .update(changes, [ 'name', 'email' ]);
}

function remove(id) {
    return db('clients').where(id).del();
}