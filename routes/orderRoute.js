const express = require('express');

const db = require('../data/models/order');

const { validIDSchema, createOrderSchema } = require('../data/validations/validators');

const router = express.Router();

// GET all orders
router.get('/', (req, res) => {
    //! working on quert object
    // const { start, end, month } = req.query
    db.find()
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => res.status(500).json(err));
});

// GET order by ID
router.get('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const order = await db.findById(id)
        if (order) {
            res.status(200).json(order)
        } else {
            //invalid order ID
            const error = new Error('invalid_id');
            error.message = 'not found';
            error.status = 404;
            throw error;
        }
    } catch (error) {
        // ID failed validation
        if (error.errors) {
            res.status(400).json({ message: 'bad request', error: `${error.path} failed validation` })
        } else {
            next(error);
        }
    }
});
    
// GET orders by Client ID
router.get('/client/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const clientOrder = await db.findByClient(id)
        if (clientOrder.length >= 1){
            res.status(200).json(clientOrder)
        } else {
            const error = new Error('invalid_id')
            error.message = 'not found';
            error.status = 404;
            throw error;
        }
    } catch (error) {
        // client id failed validation
        if (error.errors) {
            res.status(400).json({ message: 'bad request', error: `${error.path} failed validation` })
        } else {
            next(error);
        }
    }
});

// POST (create) new order
router.post('/', async (req, res, next) => {
    try {
        const validOrder = await createOrderSchema.validate(req.body);
        const newOrder = await db.add(validOrder)
        if (newOrder) {
            res.status(201).json(newOrder);
        } else {
            const error = new Error('NO_NEWORDER');
            error.message = 'something went wrong';
            throw error;
        }
    } catch (error) {
        // request body failed validation
        if (error.errors) {
            res.status(400).json({
                message: 'bad request',
                path: error.path,
                error: `should be type ${error.params.type || error.errors[0]}`
            });
        }
        else if (error.table = 'orders') {
            console.log(error)
            res.status(404).json({
                message: 'invalid_id',
            })
        }
        else {
            next(error);
        }
    }
});

// Delete Order by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const recordsDeleted = await db.remove(id)
        if (recordsDeleted >= 1) {
            res.status(204).json()
        } else {
            const error = new Error('invalid_id');
            error.message = 'not found';
            error.status = 404;
            throw error;
        }
    } catch (error) {
        // id failed validation
        if (error.errors) {
            res.status(400).json({ message: 'bad request', path: error.path, error: `${error.params.path} failed validation` });
        } else {
            next(error)
        }
    }
});

module.exports = router;