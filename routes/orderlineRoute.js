const express = require('express');

const db = require('../data/models/orderline');

const { validIDSchema } = require('../data/validations/validators');

const router = express.Router();

// GET all order details
router.get('/', (req, res) => {
    db.find()
        .then(orderlines => {
            res.status(200).json(orderlines);
        })
        .catch(err => res.status(500).json(err));
});

// GET order details by order ID
router.get('/order/:id', async (req, res) => {
    try {
        const id = await validIDSchema.validate(req.params);
    
        db.findByOrderId(id)
            .then(orders => {
                if (orders) {
                    res.status(200).json(orders);
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
            res.status(500).json({ message: 'error finding order by id' });
        }
    }
});

module.exports = router;