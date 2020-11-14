const express = require('express');

const db = require('../data/models/order');

const { validIDSchema, createOrderSchema } = require('../data/validations/validators');

const router = express.Router();

// GET all orders
router.get('/', (req, res) => {
    //! working on quert object
    const { start, end, month } = req.query
    db.find({ start, end, month })
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => res.status(500).json(err));
});

// GET order by ID
router.get('/:id', async (req, res) => {
    try {
        const id = await validIDSchema.validate(req.params);
        
        db.findById(id)
            .then(order => {
                if (order) {
                    res.status(200).json(order);
                } else {
                    res.status(404).json({ message: `no order with the id: ${id} was found` });
                }
            })
            .catch(err => {
                throw err;
            });
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'error getting order by id', error })
        }
    }
});
    
// GET orders by Client ID
router.get('/client/:id', async (req, res) => {
    try {
        const id = await validIDSchema.validate(req.params);
        
        db.findByClient(id)
            .then(orders => {
                if (orders.length >= 1) {
                    res.status(200).json(orders);
                } else {
                    res.status(404).json({ message: `no orders for the client id: ${id}` });
                }
            })
            .catch(err => res.status(500).json(err));
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'error finding client orders', error });
        }
    }
});

// POST (create) new order
router.post('/', async (req, res, next) => {
    try {
        const validOrder = await createOrderSchema.validate(req.body);
        const newOrder = await db.newOrder(validOrder)
        res.status(201).json(newOrder);
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ error: 'unable to add order to database', error });
        }
    }
});

// Delete Order by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        
        db.remove(id)
            .then(count => {
                if (count < 1) {
                    res.status(404).json({ message: `invalid order id / order not found` });
                } else {
                    res.status(200).json({ message: `order has been deleted` });
                }
            })
            .catch(err => {
                throw err;
            });
    } catch (error) {
        if (error) {
            next(error)
        } else {
            res.status(500).json({ message: 'error deleting order', error })
        }
    }
});

module.exports = router;