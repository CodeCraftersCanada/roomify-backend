const express = require('express');
const router = express.Router();

const emailController = require('../controllers/emailNotificationController');

router.post('/request-info', emailController.sendRequestInfo);
router.post('/property-new-email', emailController.sendPropertyCreation);

module.exports = router;
