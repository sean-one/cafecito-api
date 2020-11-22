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
router.get('/order/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const orderlines = await db.findByOrderId(id)
        if (orderlines.length >= 1) {
            res.status(200).json(orderlines);
        } else {
            // invalid order ID
            const error = new Error('invalid_id');
            error.message = 'not found';
            error.status = 404;
            throw error;
        }
    } catch (error) {
        if (error.errors) {
            res.status(400).json({ message: 'bad request', error: `${error.path} failed validation` });
        } else {
            next(error);
        }
    }
});

module.exports = router;