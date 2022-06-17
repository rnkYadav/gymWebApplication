const express = require("express");
const catchAsyncError = require("../Config/catchAsyncError");

const router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

const Members = require("../Models/members");

//Get all members
router.get(
  "/",
  catchAsyncError(async (req, res, next) => {
    const allMembers = await Members.find();
    res.send(JSON.stringify(allMembers));
  }),
);

//Get membership finished members

// "SELECT * FROM members m LEFT JOIN
// (SELECT *,MAX(end_date)  FROM membership GROUP BY mid )
// m2 ON m.member_id = m2.mid
// WHERE (end_date < date('now') OR payment_date IS NULL) AND active = true;"

// router.get(
//   "/finished",
//   catchAsyncError(async (req, res, next) => {
//     const allMembers = await Members.aggregate([
//       {
//         $lookup: {
//           from: "membership",
//           localField: "_id",
//           foreignField: "memberId",
//           pipeline: [
//             {
//               $where: { active: true },
//             },
//           ],
//           as: "member_id",
//         },
//       },
//     ]);
//     res.send(JSON.stringify(allMembers));
//   }),
// );

//get single member
router.get(
  "/:id",
  catchAsyncError(async (req, res, next) => {
    const member = await Members.findById(req.params.id);

    if (!member) {
      res.status(500).send({
        success: true,
        message: "Member not found...",
      });
      return;
    }
    res.send(JSON.stringify(member));
  }),
);

//Update member
router.post(
  "/:id",
  upload.single("memberImage"),
  catchAsyncError(async (req, res, next) => {
    try {
      // console.log(req.file);
      if (req.file != null) {
        req.body.member_image = req.file.filename;
      }

      // console.log(req.body);
      let result = await Members.findByIdAndUpdate(req.params.id, req.body);

      res.send({
        success: true,
        message: "Member Updated...",
        member: result,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }),
);

//Add Member
router.post(
  "/",
  upload.single("memberImage"),
  catchAsyncError(async (req, res, next) => {
    try {
      if (req.file != null) {
        req.body.member_image = req.file.filename;
      }
      // console.log(req.body);
      const member = await Members.create(req.body);
      res.status(200).send({
        success: true,
        message: "New member added...",
        member,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }),
);

//Delete a Member
router.delete(
  "/:id",
  catchAsyncError(async (req, res, next) => {
    const member = await Members.findById(req.params.id);

    if (!member) {
      res.status(500).send({
        success: true,
        message: "Product Not Found",
      });
      return;
    }

    await member.remove();

    res.status(200).send(
      JSON.stringify({
        success: true,
        message: "Product Deleted...",
      }),
    );
  }),
);

module.exports = router;
