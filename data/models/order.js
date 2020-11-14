const db = require('../dbConfig');

module.exports = {
    find,
    findById,
    findByClient,
    add,
    newOrder,
    remove
}

async function find(query) {
    // const orderlist = await db('orders').select('orders.id', 'orders.client_id', 'orders.order_date', 'orders.order_total') 
    
    // if(query.month) {
    //      await orderlist.whereRaw('order_date', '>')
    // }
    
    return db('orders').select('orders.id', 'orders.client_id', 'orders.order_date', 'orders.order_total');
}

function findById(id) {
    return db('orders').where(id).first();
}

function findByClient(client) {
    return db('orders').where({ client_id: client.id });
}

function add(order) {
    return db('orders').insert(order).into('orders');
}

async function newOrder(order) {
    // create a transaction to force all or nothing changes
    return await db.transaction(async trx => {
        // REMOVE FROM INVENTORY
        for (let line of order.orderlines) {
            const checkProduct = await db('products').where({ id: line.product_id }).first().transacting(trx)
            // confirm the product in database
            .then(async item => {
                if (!item) {
                    const error = new Error('unknown product id')
                    error.status = 404;
                    throw error;
                }
                // confirm iventory stays at 0 or above
                if (item.item_inventory >= line.quantity) {
                    return await db('products').where({ id: line.product_id }).decrement({ item_inventory: line.quantity }).transacting(trx) 
                } else {
                    const error = new Error(`not enough ${item.item}`)
                    error.status = 400;
                    throw error;
                }
            })
        }
        // confirm client is in database
        const client = await db('clients').where({ id: order.client_id }).first().transacting(trx);
        if (client) {
            // create a new order
            return await db('orders').insert({ client_id: order.client_id, order_total: order.order_total }).into('orders').transacting(trx)
                .then(async orderId => {
                    // create the new orderlines from the order
                    for (let line of order.orderlines) {
                        await db('orderlines').insert({ 
                            product_id: line.product_id,
                            quantity: line.quantity,
                            price_each: line.price_each,
                            order_id: orderId,
                            created_at: line.created_at,
                            updated_at: line.updated_at
                        }).into('orderlines').transacting(trx)
                    }
                    return await db('orders').where({ id: orderId }).first().transacting(trx);
                })
                .catch(err => {
                    console.log('we hit the error')
                    throw err
                })
        } else {
            const error = new Error(`unknown client id`)
            throw error
        }
    })
}

function remove(id) {
    return db('orders').where(id).del();
}
