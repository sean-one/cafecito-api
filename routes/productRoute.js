const express = require('express');

const db = require('../data/models/product');

const { validIDSchema, createProductSchema, updateProductSchema, validAmountSchema } = require('../data/validations/validators')

const router = express.Router();

// GET all products
router.get('/', (req, res) => {
    db.find()
        .then(products => {
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json(products);
        })
        .catch(err => res.status(500).json(err));
});

//GET product by ID
router.get('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const product = await db.findById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            // invalid product ID
            const error = new Error('invalid_id');
            error.message = 'not found'
            error.status = 404;
            throw error;
        }
    } catch (error) {
        if (error.errors) {
            // ID failed validation
            res.status(400).json({ message: 'bad request', error: `${error.path} failed validation` })
        } else {
            next(error);
        }
    }
});

// POST (create) new product
router.post('/', async (req, res, next) => {
    try {
        const validProduct = await createProductSchema.validate(req.body);
        const product = await db.add(validProduct);
        if (product) {
            res.status(201).json(product);
        } else {
            throw error;
        }
    } catch (error) {
        // product item name failed pg unique constraint
        if (error.constraint) {
            res.status(409).json({ message: 'duplicate product | unable to create'})
        }
        // request body failed validation
        else if (error.errors) {
            res.status(400).json({ message: 'bad request', path: error.path, error: error.errors[0] });
        } else {
            next(error);
        }
    }
});

// PUT (add) product Inventory to product by id
router.put('/addProduct/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const amount = await validAmountSchema.validate(req.body);
        const added = await db.addProduct(id, amount)
        if (added.length >= 1) {
            res.status(201).json(added)
        } else {
            const error = new Error('invalid_id');
            error.message = 'not found';
            error.status = 404;
            throw error;
        }
    } catch (error) {
        // ID or amount failed validation
        if (error.errors) {
            res.status(400).json({
                message: 'bad request',
                path: error.path,
                error: `should be type ${error.params.type || error.errors[0]}`
            })
        } else {
            next(error);
        }
    }
});

// PUT (remove) product Inventory from product by id
router.put('/removeProduct/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        console.log('checked id')
        const amount = await validAmountSchema.validate(req.body);
        console.log('checked amount')
        const removed = await db.removeProduct(id, amount)
        console.log('remove product')
        // res.header("Access-Control-Allow-Origin", "*").status(201).json(removed);
        res.status(201).json(removed)
    } catch (error) {
        // params and or body fails validation
        if (error.errors) {
            res.status(400).json({
                message: 'bad request',
                path: error.path,
                error: `should be type ${error.params.type || error.errors[0] }`
            })
        } 
        // fails positive inventory validation
        else if (error.constraint) {
            res.status(409).json({ message: 'not enough inventory to complete' })
        } else {
            next(error);
        }
    }
});

// PUT (update) product by ID
router.put('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const validProduct = await updateProductSchema.validate(req.body);
        const updatedProduct = await db.update(id, validProduct)
        if (updatedProduct.length < 1) {
            const error = new Error('invalid_id');
            error.message = 'not found';
            error.status = 404;
            throw error;
        } else {
            res.status(202).json(updatedProduct);
        }
    } catch (error) {
        // request params and or body failed verification
        if (error.errors) {
            res.status(400).json({
                message: 'bad request',
                path: error.path,
                error: `should be type ${error.params.type || error.errors[0]}`
            });
        }
        // fails unique product name
        else if (error.constraint) {
            res.status(409).json({ message: 'product already exists' })
        } else {
            next(error);
        }
    }
});

// DELETE product by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const recordsDeleted = await db.remove(id)
        if (recordsDeleted >= 1) {
            res.status(204).json()
        } else {
            // ID not found
            const error = new Error('invalid_id');
            error.message = 'not found';
            error.status = 404;
            throw error;
        }
    } catch (error) {
        // ID failed validation
        if (error.errors) {
            res.status(400).json({ message: 'bad request', path: error.path, error: `${error.params.path} failed validation` });
        } else {
            next(error);
        }
    }
});

module.exports = router;
