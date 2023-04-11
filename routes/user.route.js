const express = require("express");
const userModel = require("../models/user.model");
const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let data = await userModel.find({ email });
    if (data.length > 0) {
      res.send("exists");
    } else {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          next(err);
        } else {
          try {
            let user = new userModel({ email, password: hash });
            await user.save();
            res.send("registered");
          } catch (err) {
            next(err);
          }
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let data = await userModel.find({ email });
    if (data.length == 0) {
      res.send("not exist");
    } else {
      const match = await bcrypt.compare(password, data[0].password);
      if (match) {
        let token = jwt.sign({ id: data[0]._id }, "masai");
        res.send({ token });
      } else {
        res.send("invalid cred");
      }
    }
  } catch (err) {}
});

module.exports = { userRouter };
