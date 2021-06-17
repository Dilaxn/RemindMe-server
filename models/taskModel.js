const  mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    comments: {
        type: String
    },
    users : {
        type: Array,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    doneBy: {
        type: String
    },
});
module.exports = mongoose.model('Task', taskSchema);

