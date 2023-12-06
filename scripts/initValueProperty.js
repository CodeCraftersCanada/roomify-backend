const mongoose = require("mongoose");
const PropertyType = require("../models/PropertyType");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
);

// Adding property types
const defaultPropertyTypes = [
    { _id: 1, name: "Basement" },
    { _id: 2, name: "House" },
    { _id: 3, name: "Apartment" },
    { _id: 4, name: "Studio" },
    { _id: 5, name: "Bachelor’s Pad" },
    { _id: 6, name: "Condo" },
    { _id: 7, name: "Townhouse" },
];

PropertyType.insertMany(defaultPropertyTypes)
    .then(() => {
        console.log("Default property types inserted successfully.");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error("Error inserting default property types:", error);
        mongoose.connection.close();
    });
