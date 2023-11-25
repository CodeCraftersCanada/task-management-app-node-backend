const Task = require("../models/TaskModel");
const TaskStatus = require("../models/TaskStatusModel");
const User = require("../models/UserModel");

exports.getAllTasks = async (req, res, next) => {
	const createdById = req.query.created_by;
	const assignedToId = req.query.assigned_to;
	const taskStatusId = req.query.task_status_id;

	try {
		let query = {};
		if (createdById || assignedToId) {
			query.$or = [];
			if (createdById) {
				query.$or.push({ created_by: createdById });
			}
			if (assignedToId) {
				query.$or.push({ assigned_to: assignedToId });
			}
		}
		if (taskStatusId) {
			query.task_status_id = taskStatusId;
		}

		// Retrieve all tasks with associated foreign data
		const tasks = await Task.find(query)
			.populate("created_by")
			.populate("assigned_to")
			.populate("parent_id")
			.populate("subtasks");
		res.status(200).json({
			status: true,
			message: "All tasks with associated data",
			tasks: tasks,
		});
	} catch (error) {
		console.error("Error getting tasks:", error);
		res.status(500).json({
			status: false,
			message: "Internal Server Error",
		});
	}
};

exports.createTask = async (req, res, next) => {
	console.log("reqqqq ", req.body);
	try {
		// Extract data from the request body
		const {
			title,
			description,
			start_date,
			end_date,
			task_status_id,
			created_by,
			assigned_to,
			parent_id,
			task_hours,
			unpaid_task_hours,
			paid_task_hours,
		} = req.body;

		if (!title || !description || !task_status_id || !created_by) {
			return res.status(400).json({
				status: false,
				message: "Missing required fields.",
			});
		}

		// Create a new task instance
		const newTask = new Task({
			title,
			description,
			start_date,
			end_date,
			task_status_id,
			created_by,
			assigned_to,
			parent_id,
			task_hours,
			unpaid_task_hours,
			paid_task_hours,
		});

		// Save the task to the database
		const savedTask = await newTask.save();

		res.status(201).json({
			status: true,
			message: "Task created successfully!",
			task: savedTask,
		});
	} catch (error) {
		console.error("Error creating task:", error);
		res.status(500).json({
			status: false,
			message: "Internal Server Error",
		});
	}
};

// Function to edit an existing task
exports.editTask = async (req, res, next) => {
	try {
		// Extract data from the request body
		const {
			title,
			description,
			start_date,
			end_date,
			task_status_id,
			assigned_to,
			parent_id,
			task_hours,
			unpaid_task_hours,
			paid_task_hours,
		} = req.body;

		const taskId = req.params.taskId; // Assuming taskId is part of the request parameters

		// Find the existing task by its ID
		const existingTask = await Task.findById(taskId);

		// Check if the task exists
		if (!existingTask) {
			return res.status(404).json({
				status: false,
				message: "Task not found.",
			});
		}

		// Update the task properties
		existingTask.title = title || existingTask.title;
		existingTask.description = description || existingTask.description;
		existingTask.start_date = start_date || existingTask.start_date;
		existingTask.end_date = end_date || existingTask.end_date;
		existingTask.task_status_id = task_status_id || existingTask.task_status_id;
		existingTask.assigned_to = assigned_to || existingTask.assigned_to;
		existingTask.parent_id = parent_id || existingTask.parent_id;
		existingTask.task_hours = task_hours || existingTask.task_hours;
		existingTask.unpaid_task_hours =
			unpaid_task_hours || existingTask.unpaid_task_hours;
		existingTask.paid_task_hours =
			paid_task_hours || existingTask.paid_task_hours;

		// Save the updated task to the database
		const updatedTask = await existingTask.save();

		res.status(200).json({
			status: true,
			message: "Task updated successfully!",
			task: updatedTask,
		});
	} catch (error) {
		console.error("Error updating task:", error);
		res.status(500).json({
			status: false,
			message: "Internal Server Error",
		});
	}
};
