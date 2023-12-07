const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertyStatusSchema = new Schema({
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

const PropertyStatus = mongoose.model("PropertyStatus", propertyStatusSchema);

module.exports = PropertyStatus;
