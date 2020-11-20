const db = require('../dbConfig');

module.exports = {
    find,
    findById,
    findByItem,
    add,
    addProduct,
    removeProduct,
    update,
    remove
};

function find() {
    return db('products')
        // .select('id', 'item', 'item_description', 'item_price', 'item_inventory');
}

function findById(id) {
    return db('products')
        .select('id', 'item', 'item_description', 'item_price', 'item_inventory')
        .where(id)
        .first();
}

function findByItem(item) {
    return db('products').where({ item }).first();
}

async function add(product) {
    return await db('products')
        .insert(product, [
            'id',
            'item',
            'item_description',
            'item_price',
            'item_inventory'
        ])
}

async function addProduct(id, add) {
    return await db('products')
        .where(id)
        .returning([
            'id',
            'item',
            'item_inventory'
        ])
        .increment('item_inventory', add.amount)
        .update({ updated_at: add.updated_at });
}

async function removeProduct(id, remove) {
    return await db('products')
        .where(id)
        .returning([
            'id',
            'item',
            'item_inventory'
        ])
        .decrement('item_inventory', remove.amount)
        .update({ updated_at: remove.updated_at });
}


function update(id, changes) {
    return db('products')
        .where(id)
        .update(changes, [
            'id',
            'item',
            'item_description',
            'item_price',
            'item_inventory'
        ]);
}

function remove(id) {
    return db('products').where(id).del();
}