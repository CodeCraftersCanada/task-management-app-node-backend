const Invoice = require("../models/InvoiceModel");

exports.getAllInvoices = async (req, res, next) => {
	const createdById = req.query.created_by;
	const paidToId = req.query.paid_to;

	try {
		let query = {};
		if (createdById || paidToId) {
			query.$or = [];
			if (createdById) {
				query.$or.push({ created_by: createdById });
			}
			if (paidToId) {
				query.$or.push({ paid_to: paidToId });
			}
		}

		// Retrieve all tasks with associated foreign data
		const invoices = await Invoice.find(query)
			.populate("created_by")
			.populate("paid_to")
			.populate("task_id");
		res.status(200).json({
			status: true,
			message: "All invoices with associated data",
			invoices: invoices,
		});
	} catch (error) {
		console.error("Error getting invoices:", error);
		res.status(500).json({
			status: false,
			message: "Internal Server Error",
		});
	}
};

exports.createInvoice = async (req, res, next) => {
	const { created_by, paid_to, task_id, status_id, total_hours, hourly_rate, amount } = req.body;

	try {
		// Create a new invoice
		const newInvoice = new Invoice({
			created_by,
			paid_to,
			task_id,
			status_id,
			total_hours,
			hourly_rate,
			amount,
		});

		// Save the new invoice to the database
		const savedInvoice = await newInvoice.save();

		res.status(201).json({
			status: true,
			message: "Invoice created successfully",
			invoice: savedInvoice,
		});
	} catch (error) {
		console.error("Error creating invoice:", error);
		res.status(500).json({
			status: false,
			message: "Internal Server Error",
		});
	}
};