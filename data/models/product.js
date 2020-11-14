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
        .select('id', 'item', 'item_description', 'item_price', 'item_inventory');
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
    return await db('products').insert(product).into('products')
        .then(async productId => {
            return await db('products')
                .select('id', 'item', 'item_description', 'item_price', 'item_inventory')
                .where({ id: productId })
        })
        .catch(err => {
            throw err;
        });
}

async function addProduct(id, add) {
    return await db('products').where(id).increment('item_inventory', add.amount)
        .then(async product => {
            if (product < 1) {
                const err = new Error(`no product with the id '${id}' was found`);
                err.status = 404;
                throw err;
            } else {
                return await db('products')
                    .select('id', 'item', 'item_description', 'item_price', 'item_inventory')
                    .where(id)
                    .first();
            }
        })
}

async function removeProduct(id, remove) {
    return await db('products').where(id).first()
        .then(async productInventory => {
            if (productInventory) {
                if (productInventory.item_inventory - remove.amount >= 0) {
                    return await db('products').where(id).decrement("item_inventory", remove.amount)
                } else {
                    const err = new Error(`not enough ${productInventory.item}`)
                    err.status = 400;
                    throw err;
                }
            } else {
                const err = new Error(`no product with the id '${id}' was found`)
                err.status = 404;
                throw err;
            }
        })
        .then(count => {
            return db('products')
                .select('id', 'item', 'item_description', 'item_price', 'item_inventory')
                .where(id)
                .first();
        })
        .catch(err => {
            throw err
        })
}

function update(id, changes) {
    return db('products').where(id).update(changes);
}

function remove(id) {
    return db('products').where(id).del();
}