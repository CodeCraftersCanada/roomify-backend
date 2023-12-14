const Property = require('../models/Property');
const PropertyType = require("../models/PropertyStatus");
const User = require("../models/User");
const emailController = require('../controllers/emailNotificationController');

exports.createProperty = async (req, res) => {
    const {
        user_id,
        property_status_id,
        enabled,
        verified,
        is_available,
        name,
        description,
        property_type,
        property_name,
        shared_type,
        shared_name,
        guest_number,
        bedroom_number,
        beds_number,
        bathroom_number,
        bedroom_locked,
        price,
        address1,
        address2,
        city,
        province,
        country,
        postal_code,
        latitude,
        longitude
    } = req.body;

    try {
        const property = await Property.create({
            user_id,
            property_status_id,
            enabled,
            verified,
            is_available,
            name,
            description,
            property_type,
            property_name,
            shared_type,
            shared_name,
            guest_number,
            bedroom_number,
            beds_number,
            bathroom_number,
            bedroom_locked,
            price,
            address1,
            address2,
            city,
            province,
            country,
            postal_code,
            latitude,
            longitude
        });

        try {
            const updatedUser = await User.findByIdAndUpdate(
                user_id,
                { $push: { properties: property._id } },
                { new: true }
            );

            console.log("Property and Users relationship established successfully.");
            console.log(updatedUser.email);

            await emailController.sendPropertyCreation({
                to_email: updatedUser.email,
                fullname: updatedUser.fullname,
                name: name,
                description: description,
                property_name: property_name,
                shared_name: shared_name,
                guest_number: guest_number,
                bedroom_number: bedroom_number,
                beds_number: beds_number,
                bathroom_number: bathroom_number,
                address1: address1,
                address2: address2,
                city: city,
                province: province,
                country: country,
                postal_code: postal_code
            });

            res.status(200).json({
                status: true,
                message: 'Property created successfully!',
                property: property,
                user: updatedUser
            });
        } catch (updateErr) {
            console.error(updateErr);
            res.status(500).json({
                success: false,
                message: updateErr.message,
            });
        }
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
            .populate('property_status_id')
            .populate('amenities')
            .populate('photos')
            .populate('bookings')
            ;
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
        const property = await Property.findById(propertyId)
            .populate('user_id')
            .populate('property_status_id')
            .populate('amenities')
            .populate('photos')
            .populate('bookings')
            ;

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
    const {
        name,
        description,
        enabled,
        verified,
        is_available,
        property_type,
        property_name,
        shared_type,
        shared_name,
        guest_number,
        bedroom_number,
        beds_number,
        bathroom_number,
        bedroom_locked,
        price,
        address1,
        address2,
        city,
        province,
        country,
        postal_code,
        latitude,
        longitude } = req.body;

    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            {
                name,
                description,
                enabled,
                verified,
                is_available,
                property_type,
                property_name,
                shared_type,
                shared_name,
                guest_number,
                bedroom_number,
                beds_number,
                bathroom_number,
                bedroom_locked,
                price,
                address1,
                address2,
                city,
                province,
                country,
                postal_code,
                latitude,
                longitude
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
            property: updatedProperty
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};