const User = require('../models/User');
const admin = require("firebase-admin");
const credential = require("../config/firebaseKey.json");

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

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

exports.signUp = async (req, res) => {
    try {
        //creating new user
        const user = {
            email: req.body.email,
            password: req.body.password,
        }

        const userResponse = await admin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false
        });

        res.status(200).json({
            status: true,
            message: "User created successfully!!",
            user: userResponse,
        });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Sign in user with email and password
        const user = await admin.auth().signInWithEmailAndPassword(email, password);

        // Successful login response
        res.status(200).json({
            status: true,
            message: 'Login successful',
            user: user
        });
    } catch (error) {
        // Failed login response
        res.status(401).json({
            status: false,
            message: 'Login failed',
            error: error.message
        });
    }
};