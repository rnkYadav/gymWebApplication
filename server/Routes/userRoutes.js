const express = require("express");
const catchAsyncError = require("../Config/catchAsyncError");

const router = express.Router();

const Users = require("../Models/users");

router.post(
  "/",
  catchAsyncError(async (req, res, next) => {
    console.log(req.body);
    try {
      const user = await Users.find({
        username: req.body.username,
        password: req.body.password,
      });
      if (user.length > 0)
        res.send(
          JSON.stringify({ success: true, message: "User found.", user }),
        );
    } catch (error) {
      res.send(JSON.stringify({ success: false, message: error.message }));
    }
    res.send(JSON.stringify({ success: false, message: "User not found." }));
  }),
);

module.exports = router;
