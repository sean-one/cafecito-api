const express = require('express');

const db = require('../data/models/client');

const { validIDSchema, createClientSchema, updateClientSchema } = require('../data/validations/validators');

const router = express.Router();

// GET all clients
router.get('/', (req, res) => {
    db.find()
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(err => res.status(500).json(err));
});

// GET client by ID
router.get('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        db.findById(id)
            .then(client => {
                if (client) {
                    res.status(200).json(client);
                } else {
                    res.status(404).json({ message: `no client with the id: ${id} was found` });
                }
            })
            .catch(err => res.status(500).json(err));
    } catch (error) {
        if (error) {
            next(error)
        } else {
            res.status(500).json({ message: 'error finding the client', error: error });
        }
    } 
});

// POST (create) new client
router.post('/', async (req, res, next) => {
    try {
        const validClient = await createClientSchema.validate(req.body);
        const checkForClient = await db.findByEmail(validClient.email);
        if (!checkForClient) {
            try {
                const client_id = await db.add(validClient);
                res.status(201).json(client_id);
            } catch (error) {
                res.status(500).json({ error: 'unable to add client to database' })
            }
        } else {
            res.status(409).json({ error: 'email already in database | duplicate email' });
        }
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'error creating the client', error: error })
        }
    }
});

// PUT (update) client by ID
router.put('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const validClient = await updateClientSchema.validate(req.body);
        db.update(id, validClient)
            .then(count => {
                if (count) {
                    res.status(200).json({ message: `${count} client updated` });
                } else {
                    res.status(404).json({ message: `client with the id: ${id} not found` });
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'server error', err });
            })
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'error updating the client', error: error });
        }
    }
});

// DELETE client by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        db.remove(id)
            .then(count => {
                if (count < 1) {
                    res.status(404).json({ message: `client with the id: ${id} not found` });
                } else {
                    res.status(200).json({ message: 'client has been deleted' });
                }
            })
            .catch(err => res.status(500).json({ message: 'server error', err }));
    } catch (error) {
        if (error) {
            next(error)
        } else {
            res.status(500).json({ message: 'error deleting the client', error: error });
        }
    }
});


module.exports = router;