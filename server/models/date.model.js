const mongoose = require('mongoose');
const DateSchema = new mongoose.Schema({
    date: { 
        type: String,
        required: [
            true,
            "Date is required"
        ]
    }
}, { timestamps: true });
module.exports = mongoose.model('Date', DateSchema);