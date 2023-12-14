const User = require('../models/User');
const admin = require("firebase-admin");
const credential = require("../config/firebaseKey.json");
const bcrypt = require('bcrypt');
const UserType = require('../models/UserType');
const emailController = require('../controllers/emailNotificationController');

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
            enabled: 1,
            verified: 0
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
            longitude: req.body.longitude,
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
            longitude: user.longitude,
            enabled: 1,
            verified: 0
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
            .populate("bookings")
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

        const { user_type_id, verified } = req.query;

        const filter = {};
        if (user_type_id) {
            filter.user_type_id = user_type_id;
        }
        if (verified !== undefined) {
            filter.verified = verified;
        }

        const userFound = await User.find(filter)
            .populate("user_type_id")
            .populate("properties")
            .populate("bookings")
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
        longitude: req.body.longitude,
        verified: req.body.verified
    }

    console.log(user);
    try {
        // Update password in Firebase
        await admin.auth().updateUser(user.uid, {
            password: user.password,
        });

        // Update user information in MongoDB
        const updatedUser = await User.findOneAndUpdate(
            { uid: user.uid },
            {
                user_type_id: user.userType,
                fullname: user.fullname,
                phone: user.phone,
                enabled: user.enabled,
                verified: user.verified,
                image_path: user.imagePath,
                college: user.college,
                address: user.address,
                latitude: user.latitude,
                longitude: user.longitude,
                password: user.password ? await bcrypt.hash(user.password, 10) : undefined,
            },
            { new: true } // Return the updated document
        ).populate('user_type_id');

        if (!updatedUser) {
            return res.status(404).json({
                status: false,
                message: 'User not found.',
            });
        }

        if (user.verified === 1 || user.verified === 2) {

            // Send email notification only if verified has a value of 1 or 2
            await emailController.sendUserUpdate({
                to_email: updatedUser.email,
                fullname: updatedUser.fullname,
                verified: user.verified
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
            .populate("bookings")
            .populate({
                path: "properties",
                populate: {
                    path: "bookings",
                    model: "Booking"
                }
            })
            .exec();

        if (!foundUser) {
            return res.status(404).json({
                status: false,
                message: 'User not found.',
            });
        }

        // Count the number of properties and bookings
        const propertyCount = foundUser.properties.length;

        let totalBookings = 0;
        foundUser.properties.forEach(property => {
            totalBookings += property.bookings.length;
        });

        res.status(200).json({
            status: true,
            user: foundUser,
            propertyCount: propertyCount,
            propertyBookingCount: totalBookings
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};