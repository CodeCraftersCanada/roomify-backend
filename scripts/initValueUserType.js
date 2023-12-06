const mongoose = require("mongoose");
const UserType = require("../models/UserType");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
);

//adding user type
const defaultUserType = [
    { _id: 1, name: "Admin" },
    { _id: 2, name: "College" },
    { _id: 3, name: "Landlord" },
    { _id: 4, name: "Student" },
];

UserType.insertMany(defaultUserType)
    .then(() => {
        console.log("Default user type data inserted successfully.");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error("Error inserting default user type data:", error);
        mongoose.connection.close();
    });
