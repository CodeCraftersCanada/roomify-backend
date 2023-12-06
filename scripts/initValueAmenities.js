const mongoose = require("mongoose");
const Amenities = require("../models/Amenities");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
);

// Adding amenities
const bathroomAmenities = [
    { _id: 1, name: "Hair dryer", category_id: 1 },
    { _id: 2, name: "Cleaning products", category_id: 1 },
    { _id: 3, name: "Shampoo", category_id: 1 },
    { _id: 4, name: "Conditioner", category_id: 1 },
    { _id: 5, name: "Body soap", category_id: 1 },
    { _id: 6, name: "Hot water", category_id: 1 }
];

const bedroomAndLaundryAmenities = [
    { _id: 7, name: "Free washer – In unit", category_id: 2 },
    { _id: 8, name: "Hangers", category_id: 2 },
    { _id: 9, name: "Bed lines", category_id: 2 },
    { _id: 10, name: "Extra pillows and blankets", category_id: 2 },
    { _id: 11, name: "Iron", category_id: 2 },
    { _id: 12, name: "Clothing storage: walk-in closet", category_id: 2 },
];

const entertainmentAmenities = [
    { _id: 13, name: "Exercise equipment", category_id: 3 },
    { _id: 14, name: "TV", category_id: 3 }
];


const familyAmenities = [
    { _id: 15, name: "Outdoor playground", category_id: 4 }
];

const heatingCoolingAmenities = [
    { _id: 16, name: "Air conditioning", category_id: 5 },
    { _id: 17, name: "Central Heating", category_id: 5 }
];


const safetyAmenities = [
    { _id: 18, name: "Home Alarm", category_id: 6 },
    { _id: 19, name: "Fire extinguisher", category_id: 6 }
];

const internetAmenities = [
    { _id: 20, name: "WIFI", category_id: 7 },
    { _id: 21, name: "Dedicated workspace", category_id: 7 }
];

const kitchenAmenities = [
    { _id: 22, name: "Kitchen", category_id: 8 },
    { _id: 23, name: "Refrigirator", category_id: 8 },
    { _id: 24, name: "Microwave", category_id: 8 },
    { _id: 25, name: "Toaster", category_id: 8 },
    { _id: 26, name: "Dish washer", category_id: 8 },
    { _id: 27, name: "Cooking basics", category_id: 8 },
    { _id: 28, name: "Electric Stove", category_id: 8 },
    { _id: 29, name: "Dining Table", category_id: 8 },
    { _id: 30, name: "Dishes and silverware", category_id: 8 },
];


const parkingAmenities = [
    { _id: 31, name: "Free parking on premises", category_id: 9 },
    { _id: 32, name: "Elevator", category_id: 9 }
];


// Continue with other categories and their respective amenities...
const allAmenities = [
    ...bathroomAmenities,
    ...bedroomAndLaundryAmenities,
    ...entertainmentAmenities,
    ...familyAmenities,
    ...heatingCoolingAmenities,
    ...safetyAmenities,
    ...internetAmenities,
    ...kitchenAmenities,
    ...parkingAmenities
];

Amenities.insertMany(allAmenities)
    .then(() => {
        console.log("Default amenities inserted successfully.");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error("Error inserting default amenities:", error);
        mongoose.connection.close();
    });
