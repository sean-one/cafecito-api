const express = require('express');

const db = require('../data/models/product');

const { validIDSchema, createProductSchema, updateProductSchema, validAmountSchema } = require('../data/validations/validators')

const router = express.Router();

// GET all products
router.get('/', (req, res) => {
    // console.log(req.query)
    db.find()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => res.status(500).json(err));
});

//GET product by ID
router.get('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
    
        db.findById(id)
            .then(product => {
                if (product) {
                    res.status(200).json(product);
                } else {
                    res.status(404).json({ message: `no product with the id: ${id} was found` });
                }
            })
            .catch(err => res.status(500).json(err));
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'unable to get product by id'})
        }
    }
});

// POST (create) new product
router.post('/', async (req, res, next) => {
    try {
        const validProduct = await createProductSchema.validate(req.body);
        const checkForProduct = await db.findByItem(validProduct.item);
        if (!checkForProduct) {
            try {
                const product_id = await db.add(validProduct);
                res.status(201).json(product_id);
            } catch (error) {
                res.status(500).json({ error: 'unable to add product to database' })
            }
        } else {
            res.status(200).json(checkForProduct);
        }
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'error creating the product', error: error });
        }
    }
});

// PUT (add) product Inventory to product by id
router.put('/addProduct/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const amount = await validAmountSchema.validate(req.body);
        const added = await db.addProduct(id, amount)
        res.status(201).json(added)
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'error adding product', error: error });
        }
    }
});

// PUT (remove) product Inventory from product by id
router.put('/removeProduct/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const amount = await validAmountSchema.validate(req.body);
        const removed = await db.removeProduct(id, amount)
        res.status(201).json(removed)
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'error removing product', error: error });
        }
    }
});

// PUT (update) product by ID
router.put('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const validProduct = await updateProductSchema.validate(req.body);
        
        db.update(id, validProduct)
            .then(count => {
                if (count) {
                    res.status(200).json({ message: `${count} product updated` });
                } else {
                    res.status(404).json({ message: `product with the id: ${id} not found` });
                }
            })
            .catch(error => {
                throw error;
            })
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'server error', err });
        }
    }
});

// DELETE product by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        db.remove(id)
            .then(count => {
                if (count < 1) {
                    res.status(404).json({ message: `invalid product id '${id} not found'` });
                } else {
                    res.status(200).json({ message: 'product has been deleted' });
                }
            })
            .catch(err => res.status(500).json({ message: 'server error', err }));
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'error deleting the product' })
        }
    }
});

module.exports = router;
