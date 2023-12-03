const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
	password: {
		type: String,
		required: true,
	},
    user_type_id: {
		type: Schema.Types.Number,
		ref: "UserType",
		required: true,
	},
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    phone: {
        type: String,
    },
    created_at: {
		type: Date,
		default: Date.now,
	},
});

// Before saving the user, hash the password
userSchema.pre("save", async function (next) {
	try {
		// Hash the password only if it's modified or new
		if (!this.isModified("password")) {
			return next();
		}

		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		next();
	} catch (error) {
		return next(error);
	}
});

module.exports = mongoose.model('User', userSchema);
