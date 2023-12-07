
const PropertyAmenities = require('../models/PropertyAmenities');
const Property = require('../models/Property');

exports.createAmenities = async (req, res) => {
    try {
        // Extract data from the request body
        const { property_id, amenity_id, name } = req.body;

        // Create a new PropertyAmenities document
        const newPropertyAmenity = await PropertyAmenities.create({
            property_id,
            amenity_id,
            name,
        });

        try {
			const updatedProperty = await Property.findByIdAndUpdate(
				property_id,
				{ $push: { amenities: newPropertyAmenity._id } },
				{ new: true }
			);

			console.log("Property and Amenities relationship established successfully.");

            res.status(201).json({
                status: true,
                message: 'Property amenity created successfully!',
                propertyAmenity: newPropertyAmenity,
                property: updatedProperty
            });
		} catch (updateErr) {
			console.error(updateErr);
			res.status(500).json({
				success: false,
				message: "Error updating property with amenities",
			});
		}
    } catch (error) {
        console.error('Error creating property amenity:', error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};