const User = require('../models/User');
const admin = require("firebase-admin");
const credential = require("../config/firebaseKey.json");
const bcrypt = require('bcrypt');
const UserType = require('../models/UserType');

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

exports.signUp = async (req, res) => {
    try {
        //creating new user
        const user = {
            email: req.body.email,
            password: req.body.password,
            userType: req.body.user_type_id,
            fullname: req.body.fullname,
            phone: req.body.phone
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
            user_type_id: user.userType,
            fullname: user.fullname,
            phone: user.phone,
            enabled: 1
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
            message: error.message
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        //creating new user
        const user = {
            uid: req.body.uid,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.user_type_id,
            fullname: req.body.fullname,
            phone: req.body.phone,
            imagePath: req.body.image_path,
            college: req.body.college,
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longtitude,
        }

        console.log(user);
        // Saving user to MongoDB
        const savedUser = await User.create({
            uid: user.uid,
            email: user.email,
            password: user.password,
            user_type_id: user.userType,
            fullname: user.fullname,
            phone: user.phone,
            image_path: user.imagePath,
            college: user.college,
            address: user.address,
            latitude: user.latitude,
            longitude: user.longtitude,
            enabled: 1
        });

        res.status(200).json({
            status: true,
            message: "User created successfully!!",
            user: savedUser
        });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({
            status: false,
            message: error.message
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
            .populate('user_type_id')
            .populate("properties")
            ;

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

exports.getUsers = async (req, res) => {
    try {
        const userFound = await User.find()
            .populate("user_type_id")
            .populate("properties")
            ;

        if (!userFound) {
            res.status(404).send({
                status: false,
                message: 'User not found'
            });
        }
        res.status(200).send({
            status: true,
            user: userFound
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        });
    }
};

exports.editUser = async (req, res) => {
    const { uid, email, password, userType, fullname, phone, enabled } = req.body;

    try {
        // Update password in Firebase
        await admin.auth().updateUser(uid, {
            password: password,
        });

        // Update user information in MongoDB
        const updatedUser = await User.findOneAndUpdate(
            { uid: uid },
            {
                user_type_id: userType,
                fullname: fullname,
                phone: phone,
                enabled: enabled,
                password: password ? await bcrypt.hash(password, 10) : undefined,
            },
            { new: true } // Return the updated document
        ).populate('user_type_id');

        if (!updatedUser) {
            return res.status(404).json({
                status: false,
                message: 'User not found.',
            });
        }

        res.status(200).json({
            status: true,
            message: 'User updated successfully!',
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

exports.getUserByUid = async (req, res) => {
    const { uid } = req.params;

    try {
        // Retrieve the user from MongoDB based on the Firebase UID
        const foundUser = await User
            .findOne({ uid: uid })
            .populate("user_type_id")
            .populate("properties")
            ;

        if (!foundUser) {
            return res.status(404).json({
                status: false,
                message: 'User not found.',
            });
        }

        res.status(200).json({
            status: true,
            user: foundUser,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};
