const express = require('express');
const router = express.Router();

const emailController = require('../controllers/emailNotificationController');

router.post('/request-info', emailController.sendRequestInfo);

module.exports = router;
