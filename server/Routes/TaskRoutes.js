const express = require("express");
const {
  CreateTasks,
  GetAllTasks,
  UpdateTask,
  DeleteTask,
  getTask,
  updateTaskStatus
} = require("../Controller/TaskControllers");
const router = express.Router();

//create task
router.post("/create", CreateTasks);
//update task
router.put("/update/:id", UpdateTask);
//get all tasks
router.get("/", GetAllTasks);
//get task by id
router.get("/:id", getTask);
//delete task
router.delete("/:id", DeleteTask);
//update status
router.patch('/:id/status', updateTaskStatus);

module.exports = router;
