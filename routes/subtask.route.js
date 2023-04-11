const express = require("express");
const subtaskModel = require("../models/subtask.model");

const subtaskRouter = express.Router();

subtaskRouter.post("/add", async (req, res, next) => {
  const { title, isCompleted } = req.body;
  console.log(req.body);
  try {
    let subtask = new subtaskModel({ title, isCompleted });
    await subtask.save();
    try {
      let data = await subtaskModel.find({ title });
      res.send({ subtask_Id: data[0]._id });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

subtaskRouter.get("/get", async (req, res, next) => {
  try {
    let data = await subtaskModel.find();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

subtaskRouter.get("/getone/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let data = await subtaskModel.findById(id);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

subtaskRouter.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await subtaskModel.findByIdAndDelete(id);
    res.send("deleted");
  } catch (err) {
    next(err);
  }
});

subtaskRouter.patch("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  try {
    await subtaskModel.findByIdAndUpdate(id, { isCompleted });
    res.send("updated");
  } catch (err) {
    next(err);
  }
});

module.exports = subtaskRouter;
