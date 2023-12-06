const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const amenityCategorySchema = new Schema({
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

const AmenityCategory = mongoose.model("AmenityCategory", amenityCategorySchema);

module.exports = AmenityCategory;
