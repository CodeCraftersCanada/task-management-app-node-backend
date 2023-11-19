// controllers/TaskStatusController.js

const TaskStatus = require('../models/TaskStatusModel');

exports.getAllTaskStatus = async (req, res, next) => {
    try {
        const taskStatuses = await TaskStatus.find();

        res.status(200).json({
            status: true,
            message: 'All task statuses',
            taskStatus: taskStatuses,
        });
    } catch (error) {
        console.error('Error getting task statuses:', error);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
};
