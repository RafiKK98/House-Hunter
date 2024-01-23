const express = require('express');
const router = express.Router();
const houseRenterController = require('../controllers/houseRenterController');

router.get('/:userId/bookings', houseRenterController.getBookedHouses);
router.post('/:userId/bookings', houseRenterController.bookHouse);
router.delete('/:userId/bookings/:bookingId', houseRenterController.cancelBooking);

module.exports = router;
