const mg = require("mongoose");

const subtaskSchema = mg.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
});

const subtaskModel = mg.model("subtask", subtaskSchema);

module.exports = subtaskModel;
