const express = require('express');
const router = express.Router();

const amenitiesController = require('../controllers/amenities');

router.get('/amenities', amenitiesController.getAllAmenities);

module.exports = router;
