const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

router.get('/users', userController.getUsers);
router.put('/edit-user', userController.editUser);

module.exports = router;
