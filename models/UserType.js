const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTypeSchema = new Schema({
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

const UserType = mongoose.model("UserType", userTypeSchema);

module.exports = UserType;
