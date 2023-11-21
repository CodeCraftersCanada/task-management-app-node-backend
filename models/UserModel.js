const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
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
	hourly_rate: String,
	filename: {
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

const User = mongoose.model("User", userSchema);

module.exports = User;
