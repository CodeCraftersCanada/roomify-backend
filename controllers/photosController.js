
const PropertyPhotos = require('../models/PropertyPhotos');
const Property = require('../models/Property');

exports.createPhotos = async (req, res) => {
    try {
        // Extract data from the request body
        const { property_id, photo_id, path } = req.body;

        // Create a new PropertyAmenities document
        const newPropertyPhoto = await PropertyPhotos.create({
            property_id,
            photo_id,
            path,
        });

        try {
            const updatedProperty = await Property.findByIdAndUpdate(
                property_id,
                { $push: { photos: newPropertyPhoto._id } },
                { new: true }
            );

            console.log("Property and Photos relationship established successfully.");

            res.status(201).json({
                status: true,
                message: 'Property photos created successfully!',
                propertyPhoto: newPropertyPhoto,
                property: updatedProperty
            });
        } catch (updateErr) {
            console.error(updateErr);
            res.status(500).json({
                success: false,
                message: "Error updating property with photos",
            });
        }
    } catch (error) {
        console.error('Error creating property photos:', error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};