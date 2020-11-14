const express = require('express');

const db = require('../data/models/menu_schedule.js');

const { validWeekdaySchema, validDailyMenu } = require('../data/validations/validators');

const router = express.Router();

// GET full menu schedule
router.get('/', (req, res) => {
    db.find()
        .then(fullMenu => {
            if (fullMenu) {
                res.status(200).json(fullMenu);
            } else {
                res.status(404).json({ message: 'unable to get menu' })
            }
        })
        .catch(err => res.status(500).json(err));
})

// GET menu for specific day
router.get('/:weekday', async (req, res, next) => {
    try {
        const weekday = await validWeekdaySchema.validate(req.params)
        db.findByDay(weekday)
            .then(dailyproduct => {
                if (dailyproduct) {
                    res.status(200).json(dailyproduct);
                } else {
                    res.status(404).json({ message: `no day ${weekday.weekday}`})
                }
            })
            .catch(err => res.status(500).json(err));
    } catch (error) {
        if (error) {
            next(error);
        } else {
            res.status(500).json({ message: 'error finding menu day', error: error });
        }
    }
    
})

// POST a daily update
router.post('/update/:weekday', async (req, res) => {
    const weekday = await validWeekdaySchema.validate(req.params);
    const dailyupdate = await validDailyMenu.validate(req.body);
    db.updateDaysMenu(weekday, dailyupdate)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => res.status(500).json(err));
})

module.exports = router;