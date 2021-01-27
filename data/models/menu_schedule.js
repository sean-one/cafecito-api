const db = require('../dbConfig');

module.exports = {
    find,
    findByDay,
    updateDaysMenu,
    closed
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
    try {
        // transaction to avoid insert error after delete
        await db.transaction(async trx => {
            
            // create menu to update
            const updatedMenu = []
            for (let product of dailyupdate) {
                updatedMenu.push({ weekday: `${day.weekday}`, product_id: `${product.product_id}` })
            }

            // delete existing days menu (fresh start)
            await db('menu_schedule').transacting(trx).where({ weekday: day.weekday }).del()
            // insert the new days menu
            await db('menu_schedule').transacting(trx).insert(updatedMenu).into('menu_schedule');
        })

        // return days updated menu
        return await db('products')
            .join('menu_schedule', 'menu_schedule.product_id', 'products.id')
            .select('weekday', 'product_id', 'item', 'item_description', 'item_price', 'item_inventory')
            .where({ weekday: day.weekday });

    } catch (error) {
        throw error;
    }
}

async function closed(day) {
    // deletes the schedule for a specified weekday
    return await db('menu_schedule').where({ weekday: day.weekday}).del();
}