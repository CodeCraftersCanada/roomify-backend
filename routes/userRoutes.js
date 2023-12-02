const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/users', userController.getUsers);


/* USER Authentication. */
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports = router;
