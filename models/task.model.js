const mg = require("mongoose");

const taskSchema = mg.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Todo", "Doing", "Done"], default: "Todo" },
  subtask: [{ type: String, ref: "Subtask" }],
});

const taskModel = mg.model("task", taskSchema);

module.exports = taskModel;
