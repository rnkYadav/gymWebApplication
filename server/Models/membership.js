const mongoose = require("mongoose");

const MembershipSchema = mongoose.Schema({
  amount: Number,
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  paymentDate: Date,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Membership", MembershipSchema);
