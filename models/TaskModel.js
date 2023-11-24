const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        default: null,
    },
    end_date: {
        type: Date,
        default: null,
    },
    task_status_id: {
        type: Schema.Types.ObjectId,
        ref: 'TaskStatus', // Reference to TaskStatus model
        required: true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'Task', // Reference to Task model (self-reference for parent-child relationship)
    },
    task_hours: {
        type: Number,
        min: 0,
        max: 9999999999.99, // 10 digits before the decimal and 2 digits after the decimal
        default: null,
    },
    unpaid_task_hours: {
        type: Number,
        min: 0,
        max: 9999999999.99, // 10 digits before the decimal and 2 digits after the decimal
        default: null,
    },
    paid_task_hours: {
        type: Number,
        min: 0,
        max: 9999999999.99, // 10 digits before the decimal and 2 digits after the decimal
        default: null,
    },
    // Reference to SubTask model
    subtasks: [{
        type: Schema.Types.ObjectId,
        ref: 'SubTask',
    }],
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
