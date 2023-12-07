const mongoose = require("mongoose");
const PropertyStatus = require("../models/PropertyStatus");

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
const defaultPropertyStatus = [
    { _id: 1, name: "Pending" },
    { _id: 2, name: "Approved" },
    { _id: 3, name: "Rejected" }
];

PropertyStatus.insertMany(defaultPropertyStatus)
    .then(() => {
        console.log("Default property status inserted successfully.");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error("Error inserting default property status:", error);
        mongoose.connection.close();
    });
