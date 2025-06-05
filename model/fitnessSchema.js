const mongoose = require('mongoose');

const fitnessSchema = new mongoose.Schema({
    name: String,
    date: String,
    exercise: String,
    duration: Number,
    weight: Number,
    calories: Number
});

module.exports = mongoose.model('Fitness', fitnessSchema);
