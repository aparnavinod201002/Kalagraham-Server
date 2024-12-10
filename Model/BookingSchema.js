const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    carnival_id: { // Using snake_case for MongoDB field names is acceptable, but it's better to stick to camelCase
        type: String,
        required: true
    },
    ticket_count: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    required_date: {
        type: Date,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    PaymentStatus:{
        type: String,
        required: true
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
