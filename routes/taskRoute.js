const express = require('express');
const {tasksFullDeleteController} = require("../controllers/task.controller");
const {authMidController} = require("../controllers/auth.controller");
const {tasksDeleteController} = require("../controllers/task.controller");
const {tasksReadController} = require("../controllers/task.controller");

const {taskAddController} = require('../controllers/task.controller');
const router = new express.Router();

router.post('/',authMidController, taskAddController);
router.get('/', tasksReadController);
router.delete('/', tasksDeleteController);
router.delete('/full', tasksFullDeleteController);



module.exports = router;