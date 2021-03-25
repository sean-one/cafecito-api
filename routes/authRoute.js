const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../data/models/client');

const router = express.Router();

const createToken = (user) => {
    const payload = {
        subject: user.id,
        name: user.name
    }
    const secret = process.env.JWT_SECRET;
    const options ={
        expiresIn: process.env.JWT_EXPIRES
    }
    return jwt.sign(payload, secret, options);
}

router.post('/register', async (req, res) => {
    const enteredCredentials = req.body;
    if(!enteredCredentials.name || !enteredCredentials.password || !enteredCredentials.email) {
        res.status(400).json({ message: 'please fill all required inputs' });
    } else {
        const hash = bcrypt.hashSync(enteredCredentials.password, parseInt(process.env.SALTROUNDS));
        enteredCredentials.password = hash;
        const user = await db.add(enteredCredentials);
        res.status(200).json(user)
    }    
})

router.post('/login', async (req, res) => {
    const creds = req.body;
    if(!creds.name || !creds.password) {
        res.status(400).json({ message: 'please fill all required inputs' });
    } else {
        const hash = bcrypt.hashSync(creds.password, parseInt(process.env.SALTROUNDS));
        creds.password = hash;
        const user = await db.findByUsername(creds.name)
        console.log(user)
        if(!user || !bcrypt.compare(creds.password, user.password)) {
            res.status(401).json({ message: 'invalid credentials' })
        } else {
            const token = await createToken(user);
            res.status(200).json({ message: 'welcome', token });
        }
        
    }
})

module.exports = router;