const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const amenitiesSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: String,
    category_id: {
		type: Schema.Types.Number,
		ref: "AmenityCategory",
		required: true,
	},
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const Amenities = mongoose.model("Amenities", amenitiesSchema);

module.exports = Amenities;
