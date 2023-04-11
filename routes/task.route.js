const express = require("express");
const taskModel = require("../models/task.model");

const taskRouter = express.Router();

taskRouter.post("/add", async (req, res, next) => {
  const { title, description, subtask } = req.body;
  console.log(req.body);

  try {
    let newData = await taskModel.find({ title });
    if (newData.length > 0) {
      res.send("exist");
    } else {
      let task = new taskModel({ title, description, subtask });
      await task.save();
      try {
        let newTask = await taskModel.find({ title });
        res.send({ taskID: newTask[0]._id });
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
});

taskRouter.get("/getone/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let data = await taskModel.findById(id);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

taskRouter.get("/get", async (req, res, next) => {
  try {
    let data = await taskModel.find();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

taskRouter.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await taskModel.findByIdAndDelete(id);
    res.send("deleted");
  } catch (err) {
    next(err);
  }
});

taskRouter.patch("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const { status, subtask } = req.body;
  try {
    await taskModel.updateOne(
      { _id: id },
      { $set: { subtask: subtask, status } }
    );
    res.end("Updated successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = taskRouter;
