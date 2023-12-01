const User = require('../models/User');

exports.getUsers = async (req, res) => {

    res.send('Invoked USERS services');
    /*try {
        const userFound = await User.find();

        if (!userFound) {
            res.status(404).send({message: 'User not found'});
        }
        res.status(200).send({user: userFound});
    } catch (error) {
        res.status(500).send({message: 'Error had occurred'});
    }*/
};
