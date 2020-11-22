const db = require('../dbConfig');

module.exports = {
    find,
    findByDay,
    updateDaysMenu
}

async function find() {
    return await db('products')
        .join('menu_schedule', 'menu_schedule.product_id', 'products.id')
        .select('weekday', 'product_id', 'item', 'item_description', 'item_price', 'item_inventory')
}

async function findByDay(day) {
    return await db('products')
        .join('menu_schedule', 'menu_schedule.product_id', 'products.id')
        .select('weekday','product_id', 'item', 'item_description', 'item_price', 'item_inventory')
        .where({ weekday: day.weekday });
}

async function updateDaysMenu(day, dailyupdate) {
    return await db('menu_schedule').where({ weekday: day.weekday }).del()
        .then(async count => {
            return await db('menu_schedule').insert(dailyupdate).into('menu_schedule');
        })
        .then(added => {
            return added
        })
        .catch(err => {
            throw err;
        })
}