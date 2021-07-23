const Task = require('../models/taskModel');


const { validationResult } = require('express-validator');

const { errorHandler } = require('../helpers/dbErrorHandling');




exports.taskAddController = (req, res) => {
    const { taskName, taskDescription, comments,users } = req.body;
    console.log(req.user)
    const createdBy = req.user.email;
    const doneBy = "";
    const errors = validationResult(req);
    console.log("ok")
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            errors: firstError
        });
    } else {
        const task = new Task({
            taskName,
            taskDescription,
            comments,
            users,
            createdBy,
            doneBy


        });

        task.save(function (err, task) {
            if (err) return console.error(err);
            return res.status(201).json({
                message: "Task created successfully"
            });
        });
        console.log(task)
    }
};

exports.tasksReadController = async (req, res) => {
    try {
        const tasks = await Task.find({}).select();

        if (!tasks) {
            res.status(404).send({message: 'not found'});
            return;
        }
        else if(tasks.length === 0){
            res.send([]);
        }
        res.send(tasks);
    }catch (e) {
        res.status(500).send(e);
    }
}

exports.tasksDeleteController  = async (req, res) => {
    try {

        const tasks = req.body.tasks;
        console.log(req.headers.authorization)

        if (!tasks || tasks.length === 0 || !Array.isArray(tasks)) {
            res.status(400).send({message: 'could not delete'});
            return;
        }

        const response = [];

        for (const task of tasks) {
            const deleted = await Task.findById(task).select();

            if (deleted) {
                deleted.doneBy = req.headers.authorization;
                console.log(deleted);
                deleted.save();
                res.status(200).send({message: 'Successfully deleted'});
                // response.push(deleted);
            }
        }

        if (response.length === 0) {
            res.status(404).send({message: 'non of the job title were deleted'});
            return;
        }

        res.send(response);
    }catch (e) {
        res.status(500).send(e);
    }
}

exports.tasksFullDeleteController  = async (req, res) => {
    try {

        const tasks = req.body.tasks;
        console.log(req.headers.authorization)

        if (!tasks || tasks.length === 0 || !Array.isArray(tasks)) {
            res.status(400).send({message: 'could not delete'});
            return;
        }

        const response = [];

        for (const task of tasks) {
            const deleted = await Task.findById(task).select();

            if (deleted) {
                deleted.remove();
                res.status(200).send({message: 'Successfully deleted'});
                // response.push(deleted);
            }
        }

        if (response.length === 0) {
            res.status(404).send({message: 'non of the job title were deleted'});
            return;
        }

        res.send(response);
    }catch (e) {
        res.status(500).send(e);
    }
}