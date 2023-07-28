const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    description: { 
        type: String,
        required: [
            true,
            "Description is required"
        ],
        minLength:[
            1, 
            "Description must be at least 1 characters long!"
        ]
    },
    time: { 
        type: Number,
        required: [
            true,
            "Time is required"
        ],
        min:[
            1,
            "Time must be greater than 0"
        ],
        max:[
            12,
            "Time must be less than 13"
        ]
    },
    period: { 
        type: String,
        required: [
            true,
            "Time period is required"
        ]
    },
    dateId: {
        type: String,
        required: [
            true
        ]
    }
}, { timestamps: true });
module.exports = mongoose.model('Event', EventSchema);