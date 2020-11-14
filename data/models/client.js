const db = require('../dbConfig');

module.exports = {
    find,
    findById,
    findByEmail,
    add,
    update,
    remove
};

function find() {
    return db('clients')
        // .select('id', 'name', 'email');
}

function findById(id) {
    return db('clients')
        .select('id', 'name', 'email')
        .where(id)
        .first();
}

function findByEmail(email) {
    return db('clients').where({ email }).first();
}

async function add(client) {
    return await db('clients').insert(client).into('clients')
        .then(async clientId => {
            return await db('clients')
                .select('id', 'name', 'email')
                .where({ id: clientId})
        })
        .catch(err => {
            throw err;
        });
}

function update(id, changes) {
    return db('clients').where(id).update(changes);
}

function remove(id) {
    return db('clients').where(id).del();
}