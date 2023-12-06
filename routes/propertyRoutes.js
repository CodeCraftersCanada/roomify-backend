// routes/index.js
const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/property');

// Create property
router.post('/properties', PropertyController.createProperty);

// Get all properties
router.get('/properties', PropertyController.getAllProperties);

// Get property by ID
router.get('/properties/:id', PropertyController.getPropertyById);

// Update property by ID
router.put('/properties/:id', PropertyController.updatePropertyById);

module.exports = router;
