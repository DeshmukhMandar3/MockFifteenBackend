const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const boardRouter = require("./routes/board.route");
const taskRouter = require("./routes/task.route");
const subtaskRouter = require("./routes/subtask.route");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use("/board", boardRouter);

app.use("/subtask", subtaskRouter);

app.use("/task", taskRouter);

app.use("/", (req, res) => {
  res.send("Home Route");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log("Server Started at PORT 8080");
});
