const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertyPhotosSchema = new Schema({
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    photo_id: {
        type: Number,
        required: true,
    },
    path: String,
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const PropertyPhotos = mongoose.model("PropertyPhotos", propertyPhotosSchema);

module.exports = PropertyPhotos;
