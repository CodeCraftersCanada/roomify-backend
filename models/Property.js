// models/Property.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    property_type_id: {
        type: Schema.Types.Number,
        ref: "PropertyType",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    pricing: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Property', propertySchema);
