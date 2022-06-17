const express = require("express");
const catchAsyncError = require("../Config/catchAsyncError");

const router = express.Router();

const Membership = require("../Models/membership");

//Get all membership for a member
router.get(
  "/member/:mid",
  catchAsyncError(async (req, res, next) => {
    const allMemberships = await Membership.find()
      .where("memberId")
      .equals(req.params.mid);
    res.send(JSON.stringify(allMemberships));
  }),
);

//get single membership
router.get(
  "/:id",
  catchAsyncError(async (req, res, next) => {
    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      res.status(500).send({
        success: true,
        message: "Memberhip not found...",
      });
      return;
    }
    res.status(500).send({
      success: true,
      message: "Memberhip exist...",
      membership,
    });
  }),
);

//Update membership
router.post(
  "/:id",
  catchAsyncError(async (req, res, next) => {
    // console.log(req.params.id);
    try {
      let membership = await Membership.findByIdAndUpdate(
        req.params.id,
        req.body,
      );

      res.send({
        success: true,
        message: "Membership Updated...",
        membership,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }),
);

//Create a Membership
router.post(
  "/",
  catchAsyncError(async (req, res, next) => {
    // console.log(req.body);
    const membership = await Membership.create(req.body);
    res.status(200).send(JSON.stringify(membership));
  }),
);

module.exports = router;
