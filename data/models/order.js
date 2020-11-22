const db = require('../dbConfig');

module.exports = {
    find,
    findById,
    findByClient,
    add,
    remove
}

async function find(query) {
    // const orderlist = await db('orders').select('orders.id', 'orders.client_id', 'orders.order_date', 'orders.order_total') 
    
    // if(query.month) {
    //      await orderlist.whereRaw('order_date', '>')
    // }
    
    return db('orders')
        // .select('orders.id', 'orders.client_id', 'orders.order_date', 'orders.order_total');
}

function findById(id) {
    return db('orders')
        .select('id', 'client_id', 'order_date','order_total')
        .where(id)
        .first();
}

function findByClient(client) {
    return db('orders')
        .select('id', 'client_id', 'order_date', 'order_total')
        .where({ client_id: client.id });
}

async function add(order) {
    try {

        return db.transaction(async trx => {
            
            // remove each orderline from inventory
            const orderlines = order.orderlines;
            for (let line of orderlines) {
                await db('products')
                .transacting(trx)
                .where({ id: line.product_id })
                .decrement({ item_inventory: line.quantity })
                .update({ updated_at: new Date() });
            }

            // create new order and return created orders ID
            const [createdOrder] = await db('orders')
                .transacting(trx)
                .insert({
                    client_id: order.client_id,
                    order_total: order.order_total
                }, [ 'id', 'client_id', 'order_total' ]);
            
            createdOrder.orderlines = [];
            // create orderlines with new order id
            for (let orderline of orderlines) {
                await db('orderlines')
                    .transacting(trx)
                    .insert({
                        product_id: orderline.product_id,
                        quantity: orderline.quantity,
                        price_each: orderline.price_each,
                        order_id: createdOrder.id
                    }, [ 'id', 'product_id', 'quantity', 'price_each' ])
                    .then(([insertedLine]) => {
                        createdOrder.orderlines.push(insertedLine)
                    })
            }
    
            return createdOrder;
        })
        
    } catch (error) {
        console.log(error)
        throw error;

    }
}

function remove(id) {
    return db('orders').where(id).del();
}
