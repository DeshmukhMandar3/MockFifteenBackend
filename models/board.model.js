const mg = require("mongoose");

const boardSchema = mg.Schema({
  name: { type: String, required: true },
  tasks: [{ type: String, ref: "Task" }],
});

const boardModel = mg.model("board", boardSchema);

module.exports = boardModel;
