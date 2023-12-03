const User = require('../models/User');
const admin = require("firebase-admin");
const credential = require("../config/firebaseKey.json");
const bcrypt = require('bcrypt');
const UserType = require('../models/UserType');

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
            userType: req.body.user_type_id,
        }

        const userResponse = await admin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false
        });

        // Saving user to MongoDB
        const savedUser = await User.create({
            uid: userResponse.uid,
            email: user.email,
            password: user.password,
            user_type_id: user.userType
        });

        res.status(200).json({
            status: true,
            message: "User created successfully!!",
            firebaseUser: userResponse,
            user: savedUser
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
        const fireBaseUser = await admin.auth().getUserByEmail(email);

        if (!fireBaseUser) {
            return res.status(401).json({
                status: false,
                message: "Authentication failed. Firebase user not found.",
            });
        }

        // Retrieve the user from MongoDB based on the Firebase UID
        const foundUser = await User
            .findOne({ uid: fireBaseUser.uid })
            .populate('user_type_id');

        if (!foundUser) {
            return res.status(401).json({
                status: false,
                message: "Authentication failed. User not found.",
            });
        }

        // Compare the entered password with the hashed password in the database
        bcrypt.compare(password, foundUser.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({
                    status: false,
                    message: "Authentication failed. Incorrect password.",
                });
            }

            res.status(200).json({
                status: true,
                message: "Authentication successful!",
                user: foundUser
            });
        });
    } catch (error) {
        // Failed login response
        res.status(401).json({
            status: false,
            message: 'Login failed!!!',
            error: error.message
        });
    }
};