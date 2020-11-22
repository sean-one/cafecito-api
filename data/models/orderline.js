const db = require('../dbConfig');

module.exports = {
    find,
    findByOrderId
}

function find() {
    return db('orderlines')
        .select('id', 'order_id', 'product_id', 'quantity', 'price_each');
}

function findByOrderId(order) {
    return db('orderlines')
        .select('id', 'order_id', 'product_id', 'quantity', 'price_each')
        .where({ order_id: order.id});
}