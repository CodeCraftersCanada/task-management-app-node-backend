// import express
const express = require('express');
// create a router
const router = express.Router();

/**** IMPORT CONTROLLERS ***/
const userController = require('../controllers/UserController');
const taskController = require('../controllers/TaskController');
const taskStatusController = require('../controllers/TaskStatusController');

/**** AUTHENTICATION ROUTE ***/
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);

/**** USERS ROUTE ***/
router.get('/user', userController.getUsers);
router.put('user/:userId', userController.editUser);

/**** TASK ROUTE ***/
router.get('/tasks', taskController.getAllTasks);
router.post('/tasks',taskController.createTask);
router.put('/tasks/:taskId', taskController.editTask);

// Task Status routes
router.get('/taskSatus', taskStatusController.getAllTaskStatus);

// export the router
module.exports = router;