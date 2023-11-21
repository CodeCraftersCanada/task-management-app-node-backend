const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTypeSchema = new Schema({
	name: String,
	created_at: {
		type: Date,
		default: Date.now,
	},
	user_type_id: {
		type: Number,
		required: true,
	},
});

const UserType = mongoose.model("UserType", userTypeSchema, "usertype");

module.exports = UserType;
