const express = require("express");
const boardModel = require("../models/board.model");
const boardRouter = express.Router();

boardRouter.post("/add", async (req, res, next) => {
  const { name } = req.body;
  try {
    let newboard = new boardModel({ name, tasks: [] });
    await newboard.save();
    try {
      let board = await boardModel.find({ name });
      res.send({ boardId: board[0]._id });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

boardRouter.get("/getone/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let data = await boardModel.findById(id);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

boardRouter.get("/get", async (req, res, next) => {
  try {
    let data = await boardModel.find();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

boardRouter.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let data = await boardModel.findByIdAndDelete(id);
    res.send("Deleted Successfully");
  } catch (err) {
    next(err);
  }
});

boardRouter.patch("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const { tasks } = req.body;
  try {
    await boardModel.updateOne({ _id: id }, { $set: { tasks: tasks } });
    res.send("Data Updated Successfully");
  } catch (err) {
    next(err);
  }
});

module.exports = boardRouter;
