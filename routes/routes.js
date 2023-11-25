// import express
const express = require("express");
// create a router
const router = express.Router();
const verifyToken = require("../auth/authMiddleware");

/**** IMPORT CONTROLLERS ***/
const userController = require("../controllers/UserController");
const taskController = require("../controllers/TaskController");
const taskStatusController = require("../controllers/TaskStatusController");
const subTaskStatusController = require("../controllers/SubTaskController");

/**** AUTHENTICATION ROUTE ***/
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

/**** USERS ROUTE ***/
router.get("/user", verifyToken, userController.getUsers);
router.put("user/:userId", verifyToken, userController.editUser);

/**** TASK ROUTE ***/
router.get("/tasks", verifyToken, taskController.getAllTasks);
router.post("/tasks", verifyToken, taskController.createTask);
router.put("/tasks/:taskId", verifyToken, taskController.editTask);

// Task Status routes
router.get("/taskSatus", taskStatusController.getAllTaskStatus);

/**** SUB TASK ROUTE ***/
router.post("/subTask", subTaskStatusController.createSubTask);
router.get("/subTask", subTaskStatusController.getAllSubTasks);
router.put("/subTasks/:subtaskId", subTaskStatusController.editSubTask);

// export the router
module.exports = router;
