const Task = require("../Model/TaskModel");
const addTaskValidation = require("../Validations/Tasks");

const CreateTasks = async (req, res) => {
  try {
    const { error } = addTaskValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ msg: error.details[0].message });
    }
    const addTask = new Task({
      ...req.body,
    });
    await addTask.save();
    res.status(201).send({
      success: true,
      msg: "Task Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};

const GetAllTasks = async (req, res) => {
  try {
    const data = await Task.find({});
    res.status(200).send({
      success: true,
      msg: "All Tasks fetched Successfully",
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};

const UpdateTask = async (req, res) => {
  try {
    const { error } = addTaskValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ msg: error.details[0].message });
    }
    const { title, description, completed } = req.body;
    const data = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        description: description,
        completed: completed,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      msg: "Task Updated Successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};

const DeleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      msg: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};

const getTask = async (req, res) => {
  try {
    const data = await Task.findById(req.params.id);
    res.status(200).send({
      success: true,
      msg: "Task Fetched Successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error,
    });
  }
};

const updateTaskStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { isCompleted } = req.body;
  
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ success: false, msg: "Task not found" });
  
      task.isCompleted = isCompleted;
      await task.save();
  
      res.status(200).json({ success: true, task, msg: "Task status updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, msg: "Something went wrong" });
    }
  };
  
  module.exports = { updateTaskStatus };
  
module.exports = {
  CreateTasks,
  GetAllTasks,
  UpdateTask,
  DeleteTask,
  getTask,
  updateTaskStatus,
};
