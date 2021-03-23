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
        const user = await db.findById(id)
        if (user) {
            res.status(200).json(user)
        } else {
            // ID not in database
            const error = new Error('invalid_id');
            error.message = 'not found';
            error.status = 404;
            throw error;
        }
    } catch (error) {
        // failed ID validation
        if (error.errors) {
            res.status(400).json({ message: 'bad request', path: error.path })
        } else {
            next(error);
        }
    }
});

// POST (create) new client
router.post('/', async (req, res, next) => {
    try {
        const validClient = await createClientSchema.validate(req.body);
        const createdClient = await db.add(validClient)
        if (createdClient) {
            res.status(201).json(createdClient);
        } else {
            throw error;
        }
    } catch (error) {
        // request body fails validation
        if (error.errors) {
            res.status(400).json({ message: 'bad request', path: error.path, error: error.errors[0] });
        }
        // postgres unique email constraint error
        else if (error.constraint) {
            res.status(409).json({ message: 'duplicate email | unable to create user' })
        } else {
            next(error);
        }
    }
});

// Client login
router.post('/login', async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const foundUser = await db.findByUsername(username);
        // console.log(foundUser);
        if(!foundUser) {
            res.status(404).json({ message: 'username not found'});
            // console.log('user not found');
        } else if(foundUser.email != email) {
            res.status(400).json({ message: 'username and email do not match'})
            // console.log('got em', foundUser)
        } else {
            // console.log(req.session)
            // req.session.isLoggedIn = true;
            // console.log(req.session)
            //!res.redirect(200, 'http://localhost:3000');
            // res.status(200).json({ message: 'everything looks good'})
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// PUT (update) client by ID
router.put('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const validClient = await updateClientSchema.validate(req.body);
        const updatedClient = await db.update(id, validClient)
        // ID not found
        if (updatedClient.length < 1) {
            const error = new Error('invalid_id');
            error.message = 'not found';
            error.status = 404;
            throw error;
        } else {
            res.status(202).json(updatedClient);
        }
    } catch (error) {
        // postgres unique email contraint error
        if (error.constraint) {
            res.status(409).json({ message: 'duplicate email | unable to update user' })
        }
        // request body or id failed validation
        else if (error.errors) {
            res.status(400).json({ message: 'bad request', path: error.path, error: error.errors[0] })
        }
        else {
            next(error);
        }
    }
});

// DELETE client by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const id = await validIDSchema.validate(req.params);
        const recordsDeleted = await db.remove(id)
        if (recordsDeleted >= 1) {
            res.status(204).json();
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
            next(error)
        }
    }
});


module.exports = router;