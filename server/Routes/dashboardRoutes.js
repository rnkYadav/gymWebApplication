const express = require("express");
const catchAsyncError = require("../Config/catchAsyncError");

const router = express.Router();

const Members = require("../Models/members");

//Get all members
router.get(
  "/",
  catchAsyncError(async (req, res, next) => {
    const totalMembers = await Members.count();
    const activeMembers = await Members.count({ active: true });
    const inactiveMembers = await Members.count({ active: false || null });

    const dashboardData = {
      totalMembers,
      activeMembers,
      inactiveMembers,
    };
    res.send(JSON.stringify(dashboardData));
  }),
);

module.exports = router;
