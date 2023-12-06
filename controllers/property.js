// controllers/PropertyController.js
const Property = require('../models/Property');
const PropertyType = require("../models/PropertyType");

exports.createProperty = async (req, res) => {
    const { user_id, property_type_id, name, description, pricing, address, latitude, longitude } = req.body;

    try {
        const property = await Property.create({
            user_id,
            property_type_id,
            name,
            description,
            pricing,
            address,
            latitude,
            longitude,
        });

        res.status(201).json({
            status: true,
            property,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find()
            .populate('user_id')
            .populate('property_type_id');
        res.status(200).json({
            status: true,
            properties,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};


exports.getPropertyById = async (req, res) => {
    const propertyId = req.params.id;

    try {
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                status: false,
                message: 'Property not found.',
            });
        }

        res.status(200).json({
            status: true,
            property,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};

exports.updatePropertyById = async (req, res) => {
    const propertyId = req.params.id;
    const { name, description, pricing, address, latitude, longitude } = req.body;

    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            {
                name,
                description,
                pricing,
                address,
                latitude,
                longitude,
            },
            { new: true } // Return the updated document
        );

        if (!updatedProperty) {
            return res.status(404).json({
                status: false,
                message: 'Property not found.',
            });
        }

        res.status(200).json({
            status: true,
            message: 'Property updated successfully!',
            property: updatedProperty,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};