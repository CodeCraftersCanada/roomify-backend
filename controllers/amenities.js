const Amenities = require('../models/Amenities');
const AmenityCategory = require('../models/AmenityCategory');

exports.getAllAmenities = async (req, res) => {
    try {
        // Fetch all amenities from the database
        const amenities = await Amenities.find();

        // If no amenities found, return an empty array
        if (!amenities) {
            return res.status(404).json({
                status: false,
                message: 'No amenities found',
            });
        }

        // Fetch amenity categories for each amenity using populate
        const amenitiesWithCategories = await Amenities.populate(amenities, {
            path: 'category_id',
            model: 'AmenityCategory',
        });

        // Return the response with amenities and their categories
        res.status(200).json({
            status: true,
            amenities: amenitiesWithCategories,
        });
    } catch (error) {
        // Handle errors
        console.error('Error fetching amenities:', error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
};
