// models/Property.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    property_status_id: {
        type: Schema.Types.Number,
        ref: "PropertyStatus",
        required: true,
    },
    enabled: {
        type: Number,
        default: 1,
    },
    verified: {
        type: Number,
        default: 0,
    },
    is_available: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    property_type: {
        type: Number,
    },
    property_name: String,
    shared_type: {
        type: Number,
    },
    shared_name: String,
    guest_number: {
        type: Number,
    },
    bedroom_number: {
        type: Number,
    },
    beds_number: {
        type: Number,
    },
    bathroom_number: {
        type: Number,
    },
    bedroom_locked: {
        type: Number,
        default: 0,
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    address1: String,
    address2: String,
    city: String,
    province: String,
    country: String,
    postal_code: String,
    latitude: {
        type: Schema.Types.Number,
    },
    longitude: {
        type: Schema.Types.Number,
    },
    created_at: {
		type: Date,
		default: Date.now,
	},
    updated_at: {
		type: Date,
		default: Date.now,
	},
    amenities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyAmenities',
    }],
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyPhotos',
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    }]
});

module.exports = mongoose.model('Property', propertySchema);
