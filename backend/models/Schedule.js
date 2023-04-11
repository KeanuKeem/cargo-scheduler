require('dotenv').config();
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    month: String,
    year: Number,
    shipments: [{
        date: Number,
        values: [{
            id: String,
            contType: String,
        }]
    }],
});

const Schedule = mongoose.model('Schedule', scheduleSchema);



module.exports = Schedule;