// controllers/subTaskController.js
const SubTask = require('../models/SubTaskModel');
const Task = require('../models/TaskModel')

exports.getAllSubTasks = async (req, res, next) => {
    try {
        // Retrieve all subtasks from the database
        const allSubTasks = await SubTask.find()
            .populate('task_status_id')
            .populate('task_id')
            ;

        res.status(200).json({
            success: true,
            subtasks: allSubTasks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

exports.createSubTask = async (req, res, next) => {
    try {
        const { title, task_id, task_status_id, task_hours } = req.body;

        // Create a new subtask instance
        const newSubTask = new SubTask({
            title,
            task_id,
            task_status_id,
            task_hours
        });

        // Save the subtask
        const savedSubTask = await newSubTask.save();

        try {
            // Add the _id of the created SubTask to the subtasks array of the corresponding Task
            const updatedTask = await Task.findByIdAndUpdate(
                task_id,
                { $push: { subtasks: savedSubTask._id } },
                { new: true }
            );

            console.log('SubTask and Task relationship established successfully.');

            res.status(201).json({
                success: true,
                message: 'Subtask created successfully',
                subtask: savedSubTask,
                updatedTask,
            });
        } catch (updateErr) {
            console.error(updateErr);
            res.status(500).json({
                success: false,
                message: 'Error updating task with subtask',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

exports.editSubTask = async (req, res, next) => {
    try {

        const subtaskId = req.params.subtaskId; // Assuming taskId is part of the request parameters

        const { title, task_status_id, task_hours } = req.body;

        // Find the subtask by ID and update its fields
        const updatedSubTask = await SubTask.findByIdAndUpdate(
            subtaskId,
            {
                $set: {
                    title,
                    task_status_id,
                    task_hours,
                },
            },
            { new: true }
        );

        if (!updatedSubTask) {
            return res.status(404).json({
                success: false,
                message: 'Subtask not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subtask updated successfully',
            subtask: updatedSubTask,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
