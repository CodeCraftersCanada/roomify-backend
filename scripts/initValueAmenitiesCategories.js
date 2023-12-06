const mongoose = require("mongoose");
const AmenityCategory = require("../models/AmenityCategory");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
);

//Adding amenity categories
const amenityCategories = [
    { _id: 1, name: "Bathroom" },
    { _id: 2, name: "Bedroom and Laundry" },
    { _id: 3, name: "Entertainment" },
    { _id: 4, name: "Family" },
    { _id: 5, name: "Heating and Cooling" },
    { _id: 6, name: "Home Safety" },
    { _id: 7, name: "Internet and Office" },
    { _id: 8, name: "Kitchen and Dining" },
    { _id: 9, name: "Parking and Facilities" },
];

AmenityCategory.insertMany(amenityCategories)
    .then(() => {
        console.log("Default amenity categories inserted successfully.");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error("Error inserting default amenity categories:", error);
        mongoose.connection.close();
    });