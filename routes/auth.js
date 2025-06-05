const express = require('express');
const router = express.Router();
const Fitness = require('../model/fitnessSchema'); // Make sure this path is correct

// @route   GET /api/workouts
// @desc    Get all workout entries
router.get('/workouts', async (req, res) => {
    try {
        const workouts = await Fitness.find().sort({ date: -1 });
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching workouts.' });
    }
});

// @route   POST /api/workouts
// @desc    Create a new workout entry
router.post('/workouts', async (req, res) => {
    try {
        const { name, date, exercise, duration, weight } = req.body;

        // Optional: Add calorie calculation logic
        let calories = null;
        if (exercise && duration) {
            const calorieRates = {
                'Walking': 3.8,
                'Running': 10,
                'Cycling': 8,
                'Swimming': 9.5,
                'Weight Training': 6,
                'Yoga': 3,
                'Other': 4
            };
            calories = calorieRates[exercise] ? calorieRates[exercise] * duration : 4 * duration;
        }

        const newWorkout = new Fitness({ name, date, exercise, duration, weight, calories });
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (err) {
        res.status(500).json({ error: 'Server error while saving workout.' });
    }
});

module.exports = router;
