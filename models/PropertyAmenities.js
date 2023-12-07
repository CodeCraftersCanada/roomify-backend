const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertyAmenitiesSchema = new Schema({
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    amenity_id: {
        type: Number,
        required: true
    },
    name: String,
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const PropertyAmenities = mongoose.model("PropertyAmenities", propertyAmenitiesSchema);

module.exports = PropertyAmenities;
