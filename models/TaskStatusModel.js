const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema(
	{
		_id: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
	},
	{ _id: false }
); // Disable automatic generation of ObjectId for _id

const Status = mongoose.model("TaskStatus", statusSchema);

module.exports = Status;
