// routes/index.js
const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/propertyController');
const AmenitiesController = require('../controllers/amenitiesContoller');
const PhotosController = require('../controllers/photosController');

// Create property
router.post('/properties', PropertyController.createProperty);

// Get all properties
router.get('/properties', PropertyController.getAllProperties);

// Get property by ID
router.get('/properties/:id', PropertyController.getPropertyById);

// Update property by ID
router.put('/properties/:id', PropertyController.updatePropertyById);


// Create property-amenity
router.post('/property-amenity', AmenitiesController.createAmenities);

// Create property-photos
router.post('/property-photos', PhotosController.createPhotos);

module.exports = router;
