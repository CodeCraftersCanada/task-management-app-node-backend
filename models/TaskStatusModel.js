const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    name: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Status = mongoose.model('TaskStatus', statusSchema);

module.exports = Status;