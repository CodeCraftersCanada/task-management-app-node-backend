const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subTaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    task_id: {
        type: Schema.Types.ObjectId,
        ref: 'Task', // Reference to Task model
        required: true,
    },
    task_status_id: {
        type: Schema.Types.ObjectId,
        ref: 'TaskStatus', // Reference to TaskStatus model
        required: true,
    },
    task_hours: {
        type: Number,
        min: 0,
        max: 9999999999.99, // 10 digits before the decimal and 2 digits after the decimal
        default: null,
    }
});

const SubTask = mongoose.model('SubTask', subTaskSchema);

module.exports = SubTask;
