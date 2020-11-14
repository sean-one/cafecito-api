const db = require('../dbConfig');

module.exports = {
    find,
    findByOrderId
}

function find() {
    return db('orderlines');
}

function findByOrderId(order) {
    return db('orderlines').where({ order_id: order.id});
}