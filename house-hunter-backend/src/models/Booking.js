const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
        required: true,
    },
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
  // Other booking details as needed
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
