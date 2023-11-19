// import express
const express = require('express');
// create a router
const router = express.Router();

/**** IMPORT CONTROLLERS ***/
const UserController = require('../controllers/UserController');
const taskController = require('../controllers/TaskController');

/**** AUTHENTICATION ROUTE ***/
router.post('/signup', UserController.createUser);
router.post('/login', UserController.loginUser);

/**** USERS ROUTE ***/
router.get('/user', UserController.getUsers);
router.put('user/:userId', UserController.editUser);


/**** TASK ROUTE ***/
router.get('/tasks', taskController.getAllTasks);
router.post('/tasks',taskController.createTask);
router.put('/tasks/:taskId', taskController.editTask);

// export the router
module.exports = router;