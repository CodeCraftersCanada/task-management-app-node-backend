const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
	created_by: {
		type: Schema.Types.ObjectId,
		ref: "User", // Reference to User model
		required: true,
	},
	paid_to: {
		type: Schema.Types.ObjectId,
		ref: "User", // Reference to User model
	},
	task_id: {
		type: Schema.Types.ObjectId,
		ref: "Task", // Reference to Task model
		required: true,
	},
	status_id: {
		type: Schema.Types.Number,
		ref: "TaskStatus", // Reference to TaskStatus model
		required: true,
	},
	total_hours: {
		type: Number,
		min: 0,
		max: 9999999999.99, // 10 digits before the decimal and 2 digits after the decimal
		default: null,
	},
    hourly_rate: {
		type: Number,
		min: 0,
		max: 9999999999.99, // 10 digits before the decimal and 2 digits after the decimal
		default: null,
	},
    amount: {
		type: Number,
		min: 0,
		max: 9999999999.99, // 10 digits before the decimal and 2 digits after the decimal
		default: null,
	},
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
