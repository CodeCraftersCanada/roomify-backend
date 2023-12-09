const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');

router.post('/booking', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/booking/:id', bookingController.getBookingById);

module.exports = router;
