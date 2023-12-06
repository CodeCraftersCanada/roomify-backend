const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertyTypeSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: String,
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const PropertyType = mongoose.model("PropertyType", propertyTypeSchema);

module.exports = PropertyType;
