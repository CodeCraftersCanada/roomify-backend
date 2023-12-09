const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');

// Controller to get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("property_id")
            .populate("booked_by")
            ;
        res.status(200).json({
            status: true,
            bookings: bookings
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { property_id, booked_by, amount, start_date, end_date } = req.body;

        // Assuming you have validation logic here
        // Create a new PropertyAmenities document
        const newBooking = await Booking.create({
            property_id,
            booked_by,
            amount,
            start_date,
            end_date,
        });

        try {
            const updatedProperty = await Property.findByIdAndUpdate(
                property_id,
                { $push: { bookings: newBooking._id } },
                { new: true }
            );

            const updatedUser = await User.findByIdAndUpdate(
                booked_by,
                { $push: { bookings: newBooking._id } },
                { new: true }
            );

            console.log("Property, Bookings and user relationship established successfully.");

            res.status(201).json({
                status: true,
                message: 'Booking created successfully!',
                booking: newBooking,
                property: updatedProperty,
                user: updatedUser,
            });
        } catch (updateErr) {
            console.error(updateErr);
            res.status(500).json({
                success: false,
                message: "Error updating property with photos",
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get a booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id; // Assuming the booking ID is passed as a parameter in the URL

        const booking = await Booking.findById(bookingId)
            .populate("property_id")
            .populate("booked_by");

        if (!booking) {
            return res.status(404).json({
                status: false,
                message: 'Booking not found',
            });
        }

        res.status(200).json({
            status: true,
            booking: booking,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
