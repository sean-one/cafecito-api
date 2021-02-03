const express = require('express');

const db = require('../data/models/menu_schedule.js');

const { validWeekdaySchema, validDailyMenu } = require('../data/validations/validators');

const router = express.Router();

// GET full menu schedule
router.get('/', (req, res) => {
    db.find()
        .then(fullMenu => {
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).json(fullMenu);
        })
        .catch(err => { throw err });
    })
    
    // GET menu for specific day
    router.get('/:weekday', async (req, res, next) => {
        try {
            const weekday = await validWeekdaySchema.validate(req.params)
            const dailyMenu = await db.findByDay(weekday)
            if (dailyMenu) {
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json(dailyMenu);
            } else {
                const error = new Error('invalid_day');
                error.message = 'not found';
                error.status = 404;
                throw error;
            }
    } catch (error) {
        // weekday failed validation
        if (error.errors) {
            console.log(error);
            res.status(400).json({ message: `${error.path} should be ${error.type} [${error.params.values}]` });
        } else {
            next(error);
        }
    }
    
})

// POST a daily update
//! body must contain an array of an object or objects
router.post('/update/:weekday', async (req, res, next) => {
    try {
        const weekday = await validWeekdaySchema.validate(req.params);
        const dailyupdate = await validDailyMenu.validate(req.body);
        const updatedMenu = await db.updateDaysMenu(weekday, dailyupdate)
        if (updatedMenu) {
            res.status(200).json(updatedMenu);
        } else {
            const error = new Error('invalid_weekday');
            error.message = 'not found';
            error.status = 404;
            throw error;
        }
    } catch (error) {
        if (error.code = '23503') {
            res.status(404).json({ message: 'product not found'})
        }
        // weekday or request body failed validation
        else if (error.errors) {
            res.status(400).json({ message: 'yup validation failed'})
        } else {
            next(error);
        }
    }
})

// DELETE a day's menu with out updating (closed)
router.delete('/closed/:weekday', async (req, res, next) => {
    try {
        const weekday = await validWeekdaySchema.validate(req.params);
        const recordsDeleted = await db.closed(weekday)
        res.status(204).json(recordsDeleted)
    } catch (error) {
        if (error.errors) {
            res.status(400).json({ message: 'param validation failed' })
        } else {
            next(error)
        }
    }
})

module.exports = router;